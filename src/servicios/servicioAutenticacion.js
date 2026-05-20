// Servicio de Autenticación
// Maneja todas las llamadas a la API para login y registro

const API_URL = 'http://localhost:3000';

/**
 * Registra un nuevo usuario en el sistema
 * @param {Object} datos - Datos del usuario: { nombre, usuario, contrasena, id_tipo, direccion }
 * @returns {Object} - Token JWT y datos del usuario
 */
export const registrarse = async (datos) => {
  try {
    const respuesta = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      const error = await respuesta.json();
      throw new Error(error.message || 'Error en el registro');
    }

    const resultado = await respuesta.json();
    
    // Si el backend devuelve un token JWT, guardarlo en localStorage
    if (resultado.token) {
      localStorage.setItem('token', resultado.token);
      localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
    }
    
    return resultado;
  } catch (error) {
    throw new Error(error.message || 'Error al registrarse');
  }
};

/**
 * Inicia sesión con usuario y contraseña
 * @param {string} usuario - Nombre de usuario
 * @param {string} contrasena - Contraseña
 * @returns {Object} - Token JWT y datos del usuario
 */
export const login = async (usuario, contrasena) => {
  try {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, contrasena }),
    });

    if (!respuesta.ok) {
      const error = await respuesta.json();
      throw new Error(error.message || 'Error en el login');
    }

    const resultado = await respuesta.json();
    
    // Guardar el token JWT en localStorage
    if (resultado.token) {
      localStorage.setItem('token', resultado.token);
      localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
    }
    
    return resultado;
  } catch (error) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

/**
 * Obtiene el usuario actualmente autenticado
 * @returns {Object|null} - Datos del usuario o null si no está autenticado
 */
export const obtenerUsuarioActual = () => {
  const usuarioJSON = localStorage.getItem('usuario');
  return usuarioJSON ? JSON.parse(usuarioJSON) : null;
};

/**
 * Obtiene el token JWT guardado
 * @returns {string|null} - Token JWT o null si no existe
 */
export const obtenerToken = () => {
  return localStorage.getItem('token');
};

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} - True si está autenticado, false en caso contrario
 */
export const estaAutenticado = () => {
  return !!localStorage.getItem('token');
};

/**
 * Realiza una petición HTTP con autenticación (incluye el token JWT)
 * @param {string} url - URL del endpoint
 * @param {Object} opciones - Opciones de fetch
 * @returns {Promise} - Respuesta de la petición
 */
export const peticionConAutenticacion = async (url, opciones = {}) => {
  const token = obtenerToken();
  
  const opcionesConAuth = {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...opciones.headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };
  
  const respuesta = await fetch(url, opcionesConAuth);
  
  if (respuesta.status === 401) {
    // Token expirado o inválido
    logout();
    window.location.href = '/login';
  }
  
  return respuesta;
};
