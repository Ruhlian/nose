import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3001', // Cambia a la URL de tu API
});

export default api;
