import React, { useState } from 'react';

const EditContagioForm = ({ contagio, onUpdateContagio, onCancel }) => {
  // Estado para almacenar los datos del formulario de edición
  const [formData, setFormData] = useState({
    nombre: contagio.nombre,
    apellido: contagio.apellido,
    edad: contagio.edad,
    casos_confirmados: contagio.casos_confirmados,
    login_id: contagio.login_id,
    sexo: contagio.sexo,
    status: contagio.status,
  });
  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
   // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir `edad` a número
    const updatedContagio = {
      ...contagio,
      ...formData,
      edad: parseInt(formData.edad, 10),
      casos_confirmados: parseInt(formData.casos_confirmados, 10),
      login_id: parseInt(formData.login_id, 10)
    };
    // Llamar a la función onUpdateContagio pasando el contagio actualizado
    onUpdateContagio(updatedContagio);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Edad:</label>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Casos Confirmados:</label>
        <input
          type="number"
          name="casos_confirmados"
          value={formData.casos_confirmados}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Login ID:</label>
        <input
          type="number"
          name="login_id"
          value={formData.login_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Sexo:</label>
        <input
          type="text"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Actualizar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default EditContagioForm;
