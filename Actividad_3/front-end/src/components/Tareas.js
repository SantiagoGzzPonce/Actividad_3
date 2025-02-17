import React from 'react';

const Tareas = ({ tareas, fetchTareas }) => {
  return (
    <div>
      <h2>Tareas</h2>
      <button onClick={fetchTareas}>Obtener tareas</button>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>{tarea.titulo}: {tarea.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tareas;
