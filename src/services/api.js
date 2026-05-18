import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// 1. INTERCEPTOR DE PETICIÓN: Agrega el token a cada llamada automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. INTERCEPTOR DE RESPUESTA: Detecta si el token es inválido o expiró
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el servidor dice 401 (No autorizado) o 403 (Prohibido)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("⚠️ Token inválido o expirado. Cerrando sesión...");
      
      // Limpiamos todo
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirigimos al login forzosamente
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

// --- TUS FUNCIONES ---

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/usuarios/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/usuarios/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};