import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Registrar un usuario
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

// Iniciar sesión
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

// Obtener todas las tareas
export const getTareas = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/tareas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTarea = async (token, titulo, descripcion) => {
  try {
    const response = await axios.post(
      `${API_URL}/tareas`,
      { titulo, descripcion },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    throw error;
  }
};