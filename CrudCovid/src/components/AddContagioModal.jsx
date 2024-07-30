import React, { useState } from 'react';
import axios from 'axios';
import './AddContagioModal.css';

const AddContagioModal = ({ showModal, onClose, onSave }) => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_registro: '',
    estado: '',
    edad: '',
    casos_confirmados: '',
    login_id: '',
    sexo: '',
    status: ''
  });

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Preparar los datos para el envío
    const dataToSend = {
      ...formData,
      edad: parseInt(formData.edad, 10),
      casos_confirmados: parseInt(formData.casos_confirmados, 10),
      login_id: parseInt(formData.login_id, 10),
      fecha_registro: new Date(formData.fecha_registro).toISOString()
    };

    console.log('Datos a enviar:', dataToSend);

    try {
      // Enviar los datos al backend
      const response = await axios.post('http://localhost:3000/contagios', dataToSend);
      console.log('Contagio creado:', response.data);
      // Guardar el nuevo contagio en la lista
      onSave(response.data);
      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Hubo un error al crear el contagio!', error);
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Añadir Contagio</h2>
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
            <label>Casos Confirmados:</label>
            <input type="number" name="casos_confirmados" value={formData.casos_confirmados} onChange={handleInputChange} />
          </div>
          <div>
            <label>Login ID:</label>
            <input type="number" name="login_id" value={formData.login_id} onChange={handleInputChange} />
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

export default AddContagioModal;
