/**
 * Servicio de Autenticación para el Frontend
 * Ubicación: src/services/auth.service.js
 * Descripción: Gestiona la comunicación con los endpoints de autenticación del backend.
 * Maneja el almacenamiento del token JWT, el cierre de sesión y la configuración de 
 * headers para peticiones autorizadas.
 * 
 * Nota: Utiliza localStorage para persistir la sesión entre recargas de página.
 * Los nombres de campos coinciden con la tabla 'Persona' del backend.
 */

import axios from 'axios';

// URL base del backend. 
// En producción, esto debería cargarse desde variables de entorno (import.meta.env.VITE_API_URL)
const API_URL = 'http://localhost:3000/api';

class AuthService {
    
    /**
     * Realiza el inicio de sesión enviando credenciales al backend.
     * @param {string} usuario - Nombre de usuario (coincide con BD)
     * @param {string} contrasena - Contraseña (coincide con BD)
     * @returns {Promise<Object>} Respuesta con token y datos del usuario
     */
    async login(usuario, contrasena) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                usuario,      // 👈 Coincide con tu columna en BD
                contrasena    // 👈 Coincide con tu columna en BD
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
     * Registra un nuevo usuario en el backend
     * @param {Object} data - Datos del formulario de registro
     * @returns {Promise<Object>} Respuesta del backend
     */
    async register(data) {
        try {
            // Adaptar los nombres de campos para que coincidan con la tabla Persona
            const payload = {
                usuario: data.usuario,
                contrasena: data.contrasena,
                nombre: data.nombre,
                direccion: data.direccion || null,
                id_tipo: parseInt(data.id_tipo) // Asegurar que sea número entero
            };

            const response = await axios.post(`${API_URL}/auth/register`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al registrar usuario' };
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