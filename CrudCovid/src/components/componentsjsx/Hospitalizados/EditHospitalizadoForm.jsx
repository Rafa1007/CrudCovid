import React, { useState } from 'react';

const EditHospitalizadoForm = ({ hospitalizado, onUpdateHospitalizado, onCancel }) => {
  // Estado para almacenar los datos del formulario de edición
  const [formData, setFormData] = useState({
    nombre: hospitalizado.nombre,
    apellido: hospitalizado.apellido,
    edad: hospitalizado.edad,
    numero_hospitalizados: hospitalizado.numero_hospitalizados,
    sexo: hospitalizado.sexo,
    estado: hospitalizado.estado,
    fecha_registro: hospitalizado.fecha_registro,
    status: hospitalizado.status,
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir `edad` y `numero_hospitalizados` a números
    const updatedHospitalizado = {
      ...hospitalizado,
      ...formData,
      edad: parseInt(formData.edad, 10),
      numero_hospitalizados: parseInt(formData.numero_hospitalizados, 10),
      fecha_registro: new Date(formData.fecha_registro).toISOString()
    };
    // Llamar a la función onUpdateHospitalizado pasando el hospitalizado actualizado
    onUpdateHospitalizado(updatedHospitalizado);
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
        <label>Numero de Hospitalizados:</label>
        <input
          type="number"
          name="numero_hospitalizados"
          value={formData.numero_hospitalizados}
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
        <label>Estado:</label>
        <input
          type="text"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="Contagio">Contagio</option>
          <option value="Hospitalizado">Hospitalizado</option>
          <option value="Recuperado">Recuperado</option>
          <option value="Fallecido">Fallecido</option>
        </select>
      </div>
      <button type="submit">Actualizar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default EditHospitalizadoForm;
