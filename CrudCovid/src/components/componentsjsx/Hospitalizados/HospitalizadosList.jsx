import React, { useEffect, useState } from "react";
import axios from "axios";

const HospitalizadosList = () => {
    const [hospitalizados, setHospitalizados] = useState([]);

    const [showAddModal, setShowAddModal] = useState (false);
    const [selectdHospitalizado, setSelectedHospitalizado] = useState(null);

    useEffect(() => {
        fetchHospitalizados();
    }, []);

    const fetchHospitalizados = () => {
        axios.get('http://localhost:3000/hospitalizados')
            .then(response => {
                setHospitalizados(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los hospitalizados!", error);
            });
    };
    const handleAddHospitalizado = ( newHospitalizado) => {
        setHospitalizados ([...hospitalizados, newHospitalizado]);
        setShowAddModal(false);
    }

    const handleEdit = (hospitalizado) => {
        setSelectedHospitalizado(hospitalizado);
    };

     // Función para manejar la actualización de un contagio
    const handleUpdateHospitalizado = async (updatedHospitalizado) => {
    try {
      // Enviar la actualización al backend
      await axios.put(`http://localhost:3000/hospitalizados/${updatedHospitalizado.id}`, updatedHospitalizado);
      // Refrescar la lista de contagios
      fetchHospitalizados();
      // Deseleccionar el contagio para cerrar el formulario de edición
      setSelectedHospitalizado(null);
    } catch (error) {
      console.error('Error updating hospitalzado:', error);
      console.error('Error response:', error.response);
      alert(`Failed to update hospitalizado: ${error.response?.status} ${error.response?.statusText}`);
    }
  };

  // Función para manejar la eliminación de un contagio
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/hospitalizados/${id}`)
      .then(() => {
        // Eliminar el contagio de la lista en el estado
        setHospitalizados(hospitalizados.filter(hospitalizado => hospitalizado.id !== id));
      })
      .catch(error => {
        console.error("Hubo un error al eliminar el contagio!", error);
      });
  };


    return (
        <div className="table-container">
            <h1>Lista de Hospitalizados</h1>

            <button className="button-add"onClick={() => setShowAddModal(true)}>Agregar Nuevo</button>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Estado</th>
                        <th>Edad</th>
                        <th>Fecha de Registro</th>
                        <th>Sexo</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {hospitalizados.map(hospitalizado => (
                        <tr key={hospitalizado.id}>
                            <td>{hospitalizado.nombre}</td>
                            <td>{hospitalizado.apellido}</td>
                            <td>{hospitalizado.estado}</td>
                            <td>{hospitalizado.edad}</td>
                            <td>{new Date(hospitalizado.fecha_registro).toLocaleDateString()}</td>
                            <td>{hospitalizado.sexo}</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default HospitalizadosList;
