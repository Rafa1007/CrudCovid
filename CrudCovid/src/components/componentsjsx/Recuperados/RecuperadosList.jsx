// src/components/componentsjsx/Recuperados/RecuperadosList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddRecuperadoModal from "./AddRecuperadoModal";
import EditRecuperadoForm from "./EditRecuperadoForm";

const RecuperadosList = () => {
    const [recuperados, setRecuperados] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRecuperado, setSelectedRecuperado] = useState(null);

    useEffect(() => {
        fetchRecuperados();
    }, []);

    const fetchRecuperados = () => {
        axios.get('http://localhost:3000/recuperados')
            .then(response => {
                setRecuperados(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los recuperados!", error);
            });
    };

    const handleAddRecuperado = (newRecuperado) => {
        setRecuperados([...recuperados, newRecuperado]);
        setShowAddModal(false);
    };

    const handleEdit = (recuperado) => {
        setSelectedRecuperado(recuperado);
    };

    const handleUpdateRecuperado = async (updatedRecuperado) => {
        try {
            await axios.put(`http://localhost:3000/recuperados/${updatedRecuperado.id}`, updatedRecuperado);
            fetchRecuperados();
            setSelectedRecuperado(null);
        } catch (error) {
            console.error('Error updating recuperado:', error);
            alert(`Failed to update recuperado: ${error.response?.status} ${error.response?.statusText}`);
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/recuperados/${id}`)
            .then(() => {
                setRecuperados(recuperados.filter(recuperado => recuperado.id !== id));
            })
            .catch(error => {
                console.error("Hubo un error al eliminar el recuperado!", error);
            });
    };

    return (
        <div className="table-container">
            <h1>Lista de Recuperados</h1>
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
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {recuperados.map(recuperado => (
                        <tr key={recuperado.id}>
                            <td>{recuperado.nombre}</td>
                            <td>{recuperado.apellido}</td>
                            <td>{recuperado.estado}</td>
                            <td>{recuperado.edad}</td>
                            <td>{new Date(recuperado.fecha_registro).toLocaleDateString()}</td>
                            <td>{recuperado.sexo}</td>
                            <td>
                                <button onClick={() => handleEdit(recuperado)}>Editar</button>
                                <button onClick={() => handleDelete(recuperado.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showAddModal && (
                <AddRecuperadoModal
                    showModal={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddRecuperado}
                />
            )}
            {selectedRecuperado && (
                <EditRecuperadoForm
                    recuperado={selectedRecuperado}
                    onUpdateRecuperado={handleUpdateRecuperado}
                    onCancel={() => setSelectedRecuperado(null)}
                />
            )}
        </div>
    );
};

export default RecuperadosList;
