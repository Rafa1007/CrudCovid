import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContagiosList.css';
import AddContagioModal from './AddContagioModal';
import EditContagioForm from './EditContagioForm';

const ContagiosList = () => {
  const [contagios, setContagios] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContagio, setSelectedContagio] = useState(null);

  useEffect(() => {
    fetchContagios();
  }, []);

  const fetchContagios = () => {
    axios.get('http://localhost:3000/contagios')
      .then(response => {
        setContagios(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los contagios!", error);
      });
  };

  const handleAddContagio = (newContagio) => {
    setContagios([...contagios, newContagio]);
    setShowAddModal(false);
  };

  const handleEdit = (contagio) => {
    setSelectedContagio(contagio);
  };

  const handleUpdateContagio = async (updatedContagio) => {
    try {
      await axios.put(`http://localhost:3000/contagios/${updatedContagio.id}`, updatedContagio);
      fetchContagios();
      setSelectedContagio(null);
    } catch (error) {
      console.error('Error updating contagio:', error);
      console.error('Error response:', error.response);
      alert(`Failed to update contagio: ${error.response?.status} ${error.response?.statusText}`);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/contagios/${id}`)
      .then(() => {
        setContagios(contagios.filter(contagio => contagio.id !== id));
      })
      .catch(error => {
        console.error("Hubo un error al eliminar el contagio!", error);
      });
  };

  return (
    <div className="content">
      <div className="table-container">
        <h1>Lista de Contagios</h1>
        <button className="button-add" onClick={() => setShowAddModal(true)}>Agregar Nuevo</button>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Estado</th>
              <th>Edad</th>
              <th>Fecha de Registro</th>
              <th>Sexo</th>
              <th>Estatus</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {contagios.map(contagio => (
              <tr key={contagio.id}>
                <td>{contagio.nombre}</td>
                <td>{contagio.apellido}</td>
                <td>{contagio.estado}</td>
                <td>{contagio.edad}</td>
                <td>{new Date(contagio.fecha_registro).toLocaleDateString()}</td>
                <td>{contagio.sexo}</td>
                <td>{contagio.status}</td>
                <td>
                  <button className="button-edit" onClick={() => handleEdit(contagio)}>Editar</button>
                  <button className="button-delete" onClick={() => handleDelete(contagio.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAddModal && (
          <AddContagioModal 
            showModal={showAddModal} 
            onClose={() => setShowAddModal(false)} 
            onSave={handleAddContagio}
          />
        )}
        {selectedContagio && (
          <EditContagioForm
            contagio={selectedContagio}
            onUpdateContagio={handleUpdateContagio}
            onCancel={() => setSelectedContagio(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ContagiosList;
