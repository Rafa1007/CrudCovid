import React, { useState } from 'react';

const AddRecuperadoModal = ({ showModal, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    casos_confirmados: '',
    login_id: '',
    sexo: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecuperado = {
      ...formData,
      edad: parseInt(formData.edad, 10),
      casos_confirmados: parseInt(formData.casos_confirmados, 10),
      login_id: parseInt(formData.login_id, 10)
    };
    onSave(newRecuperado);
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Recuperado</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Casos Confirmados:</label>
            <input
              type="number"
              name="casos_confirmados"
              value={formData.casos_confirmados}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Login ID:</label>
            <input
              type="number"
              name="login_id"
              value={formData.login_id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Sexo:</label>
            <input
              type="text"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecuperadoModal;
