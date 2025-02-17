import React, { useState } from 'react';

const CreateTarea = ({ handleCreateTarea }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) {
      alert('Por favor, ingresa un título y una descripción.');
      return;
    }
    handleCreateTarea(titulo, descripcion);
    setTitulo('');
    setDescripcion('');
  };

  return (
    <div>
      <h2>Crear Tarea</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título de la tarea"
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción de la tarea"
          />
        </div>
        <button type="submit">Añadir tarea</button>
      </form>
    </div>
  );
};

export default CreateTarea;
