import React, { useState } from 'react';
import axios from 'axios';

const AddRecuperadoModal = ({ showModal, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_registro: '',
    estado: '',
    edad: '',
    numero_recuperados: '',
    // login_id: '', // Descomenta este campo si es necesario
    sexo: '',
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
      numero_recuperados: parseInt(formData.numero_recuperados, 10),
      fecha_registro: new Date(formData.fecha_registro).toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:3000/recuperados', dataToSend);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Hubo un error al crear un nuevo registro!', error);
      alert(`Error: ${error.response?.status} ${error.response?.statusText}`);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Agregar Recuperado</h2>
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
            <label>Número de Recuperados:</label>
            <input type="number" name="numero_recuperados" value={formData.numero_recuperados} onChange={handleInputChange} />
          </div>
          <div>
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
              <option value="">Selecciona una opción</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecuperadoModal;
