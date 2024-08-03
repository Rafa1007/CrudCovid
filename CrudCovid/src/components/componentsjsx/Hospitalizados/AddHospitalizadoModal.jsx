import React, { useState } from "react";
import axios from "axios";

const AddHospitalizadoModal = ({ showModal, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fecha_registro: '',
        estado: '',
        edad: '',
        numero_hospitalizados: '',
        sexo: '',
        status: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            edad: parseInt(formData.edad, 10),
            numero_hospitalizados: parseInt(formData.numero_hospitalizados, 10),
            fecha_registro: new Date(formData.fecha_registro).toISOString()
        };

        try {
            const response = await axios.post('http://localhost:3000/hospitalizados', dataToSend);
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Hubo un error al crear un nuevo registro!', error);
        }
    };

    if (!showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Añadir Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Fecha de Registro:</label>
                        <input type="datetime-local" name="fecha_registro" value={formData.fecha_registro} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Estado:</label>
                        <input type="text" name="estado" value={formData.estado} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Edad:</label>
                        <input type="number" name="edad" value={formData.edad} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Número de Hospitalizados:</label>
                        <input type="number" name="numero_hospitalizados" value={formData.numero_hospitalizados} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Sexo:</label>
                        <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                        </select>
                    </div>
                    <div>
                        <label>Status:</label>
                        <select name="status" value={formData.status} onChange={handleInputChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="Contagio">Contagio</option>
                            <option value="Hospitalizado">Hospitalizado</option>
                            <option value="Recuperado">Recuperado</option>
                            <option value="Fallecido">Fallecido</option>
                        </select>
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default AddHospitalizadoModal;
