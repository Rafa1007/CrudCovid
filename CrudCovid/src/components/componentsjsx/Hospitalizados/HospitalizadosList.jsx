import React, { useEffect, useState } from "react";
import axios from "axios";
import AddHospitalizadoModal from "./AddHospitalizadoModal";
import EditHospitalizadoForm from "./EditHospitalizadoForm"; // Importar el componente de edición

const HospitalizadosList = () => {
    const [hospitalizados, setHospitalizados] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedHospitalizado, setSelectedHospitalizado] = useState(null);

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

    const handleAddHospitalizado = (newHospitalizado) => {
        setHospitalizados([...hospitalizados, newHospitalizado]);
        setShowAddModal(false);
    };

    const handleEdit = (hospitalizado) => {
        setSelectedHospitalizado(hospitalizado);
    };

    const handleUpdateHospitalizado = async (updatedHospitalizado) => {
        try {
            await axios.put(`http://localhost:3000/hospitalizados/${updatedHospitalizado.id}`, updatedHospitalizado);
            fetchHospitalizados();
            setSelectedHospitalizado(null);
        } catch (error) {
            console.error('Error updating hospitalizado:', error);
            alert(`Failed to update hospitalizado: ${error.response?.status} ${error.response?.statusText}`);
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/hospitalizados/${id}`)
            .then(() => {
                setHospitalizados(hospitalizados.filter(hospitalizado => hospitalizado.id !== id));
            })
            .catch(error => {
                console.error("Hubo un error al eliminar el hospitalizado!", error);
            });
    };

    return (
        <div className="table-container">
            <h1>Lista de Hospitalizados</h1>
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
                    {hospitalizados.map(hospitalizado => (
                        <tr key={hospitalizado.id}>
                            <td>{hospitalizado.nombre}</td>
                            <td>{hospitalizado.apellido}</td>
                            <td>{hospitalizado.estado}</td>
                            <td>{hospitalizado.edad}</td>
                            <td>{new Date(hospitalizado.fecha_registro).toLocaleDateString()}</td>
                            <td>{hospitalizado.sexo}</td>
                            <td>{hospitalizado.status}</td>
                            <td>
                                <button onClick={() => handleEdit(hospitalizado)}>Editar</button>
                                <button onClick={() => handleDelete(hospitalizado.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showAddModal && (
                <AddHospitalizadoModal
                    showModal={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddHospitalizado}
                />
            )}
            {selectedHospitalizado && (
                <EditHospitalizadoForm
                    hospitalizado={selectedHospitalizado}
                    onUpdateHospitalizado={handleUpdateHospitalizado}
                    onCancel={() => setSelectedHospitalizado(null)}
                />
            )}
        </div>
    );
};

export default HospitalizadosList;
