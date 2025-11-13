import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Conglomerados
export const getConglomerados = () => api.get('/api/conglomerados');
export const createConglomerado = (data) => api.post('/api/conglomerados', data);

// Subparcelas
export const getSubparcelas = (conglomeradoId) => 
  api.get(`/api/conglomerados/${conglomeradoId}/subparcelas`);

// Detecciones de árboles
export const saveDeteccion = (data) => api.post('/api/detecciones', data);
export const getDetecciones = (subparcelaId) => 
  api.get(`/api/subparcelas/${subparcelaId}/detecciones`);

export default api;
