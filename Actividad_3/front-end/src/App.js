import React, { useState } from 'react';
import { getTareas, createTarea } from './api';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Tareas from './components/Tareas';
import CreateTarea from './components/CreateTarea';

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const fetchTareas = async () => {
    try {
      const data = await getTareas(token);
      setTareas(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  const handleCreateTarea = async (titulo, descripcion) => {
    try {
      const data = await createTarea(token, titulo, descripcion);
      setTareas([...tareas, data]);
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <Register />
      <Login setToken={setToken} />
      <Tareas tareas={tareas} fetchTareas={fetchTareas} />
      <CreateTarea handleCreateTarea={handleCreateTarea} />
    </div>
  );
};

export default App;
