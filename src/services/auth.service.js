/**
 * Servicio de Autenticación para el Frontend
 * Ubicación: src/services/auth.service.js
 * Descripción: Gestiona la comunicación con los endpoints de autenticación del backend.
 * Maneja el almacenamiento del token JWT, el cierre de sesión y la configuración de 
 * headers para peticiones autorizadas.
 * 
 * Nota: Utiliza localStorage para persistir la sesión entre recargas de página.
 */

import axios from 'axios';

// URL base del backend. 
// En producción, esto debería cargarse desde variables de entorno (import.meta.env.VITE_API_URL)
const API_URL = 'http://localhost:3000/api';

class AuthService {
    
    /**
     * Realiza el inicio de sesión enviando credenciales al backend.
     * @param {string} username - Nombre de usuario
     * @param {string} password - Contraseña
     * @returns {Promise<Object>} Respuesta con token y datos del usuario
     */
    async login(username, password) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });

            if (response.data.success) {
                // Guardar token y datos del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(response.data.data.usuario));
                localStorage.setItem('token', response.data.data.token);
            }

            return response.data;
        } catch (error) {
            // Propagar el error para que el componente UI lo maneje
            throw error.response?.data || { message: 'Error de conexión con el servidor' };
        }
    }

    /**
     * Cierra la sesión eliminando los datos almacenados localmente.
     */
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirigir al login tras cerrar sesión
    }

    /**
     * Obtiene los datos del usuario actualmente logueado.
     * @returns {Object|null} Datos del usuario o null si no hay sesión
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Obtiene el token JWT almacenado.
     * @returns {string|null} Token o null si no existe
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Genera el header de autorización para peticiones protegidas.
     * @returns {Object} Header con Bearer token
     */
    authHeader() {
        const token = this.getToken();
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        return {};
    }
}

// Exportar instancia única
export default new AuthService();