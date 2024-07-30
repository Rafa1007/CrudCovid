import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContagiosList.css';
import AddContagioModal from './AddContagioModal';
import EditContagioForm from './EditContagioForm';

const ContagiosList = () => {
  // Estado para almacenar la lista de contagios
  const [contagios, setContagios] = useState([]);
  // Estado para controlar la visibilidad del modal para agregar contagios
  const [showAddModal, setShowAddModal] = useState(false);
  // Estado para almacenar el contagio seleccionado para editar
  const [selectedContagio, setSelectedContagio] = useState(null);

  // useEffect para obtener la lista de contagios al montar el componente
  useEffect(() => {
    fetchContagios();
  }, []);

  // Función para obtener la lista de contagios desde el backend
  const fetchContagios = () => {
    axios.get('http://localhost:3000/contagios')
      .then(response => {
        // Actualizar el estado con la lista de contagios
        setContagios(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los contagios!", error);
      });
  };

  // Función para manejar la adición de un nuevo contagio
  const handleAddContagio = (newContagio) => {
    // Agregar el nuevo contagio a la lista existente
    setContagios([...contagios, newContagio]);
    // Ocultar el modal de agregar contagio
    setShowAddModal(false);
  };

  // Función para manejar la selección de un contagio para edición
  const handleEdit = (contagio) => {
    setSelectedContagio(contagio);
  };

  // Función para manejar la actualización de un contagio
  const handleUpdateContagio = async (updatedContagio) => {
    try {
      // Enviar la actualización al backend
      await axios.put(`http://localhost:3000/contagios/${updatedContagio.id}`, updatedContagio);
      // Refrescar la lista de contagios
      fetchContagios();
      // Deseleccionar el contagio para cerrar el formulario de edición
      setSelectedContagio(null);
    } catch (error) {
      console.error('Error updating contagio:', error);
      console.error('Error response:', error.response);
      alert(`Failed to update contagio: ${error.response?.status} ${error.response?.statusText}`);
    }
  };

  // Función para manejar la eliminación de un contagio
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/contagios/${id}`)
      .then(() => {
        // Eliminar el contagio de la lista en el estado
        setContagios(contagios.filter(contagio => contagio.id !== id));
      })
      .catch(error => {
        console.error("Hubo un error al eliminar el contagio!", error);
      });
  };

  return (
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
                <button onClick={() => handleEdit(contagio)}>Editar</button>
                <button onClick={() => handleDelete(contagio.id)}>Eliminar</button>
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
  );
};

export default ContagiosList;
