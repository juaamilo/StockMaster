/**
 * Página de Inicio de Sesión (Login)
 * Ubicación: paginas/Login.jsx
 * Descripción: Interfaz de autenticación con diseño consistente con el resto de la aplicación.
 * 
 * Funcionalidades:
 * - Validación de campos requeridos
 * - Manejo de estados de carga y error
 * - Integración con AuthContext para gestión global de sesión
 * - Diseño responsive con estilos alineados al sistema visual de Pixelpitch
 */

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  // Estados del formulario (Nombres actualizados para coincidir con la BD)
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  
  // Hooks de navegación y contexto
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  /**
   * Maneja el envío del formulario de login
   * @param {Event} e - Evento de submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica antes de enviar
    if (usuario.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return;
    }
    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Ejecuta el login a través del contexto (envía usuario/contrasena a la BD)
      const resultado = await login(usuario, contrasena);
      
      if (resultado.success) {
        // Redirige al inventario tras login exitoso
        navigate('/inventario');
      } else {
        // Muestra el mensaje de error devuelto por el backend
        setError(resultado.message || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error de conexión. Verifica que el backend esté ejecutándose.');
    }
  };

  return (
    <div className="page-container" style={containerStyle}>
      
      {/* Tarjeta de Login con estilo consistente con Home.jsx */}
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>🔐 Iniciar Sesión</h2>
        <p style={{ color: '#6b7280', marginBottom: '25px' }}>
          Pixelpitch - Sistema de Inventario
        </p>
        
        {/* Alerta de error con diseño del sistema */}
        {error && (
          <div style={alertStyle}>
            ⚠️ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Usuario</label>
            <input 
              type="text" 
              placeholder="Ingresa tu usuario" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              style={inputStyle}
              autoComplete="username"
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              style={inputStyle}
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            style={buttonStyle}
          >
            Entrar
          </button>
        </form>
        
        {/* Enlace a registro manteniendo consistencia visual */}
        <p style={{ marginTop: '25px', color: '#6b7280', fontSize: '0.9rem' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" style={linkStyle}>
            Regístrate aquí
          </Link>
        </p>
      </div>
      
    </div>
  );
};

/* 🎨 ESTILOS - Alineados con el diseño de Home.jsx */

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: '#f9fafb',
  padding: '20px'
};

const cardStyle = {
  background: '#fff',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center'
};

const alertStyle = {
  background: '#fee2e2',
  color: '#991b1b',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '20px',
  border: '1px solid #fca5a5',
  fontSize: '0.9rem',
  textAlign: 'left'
};

const inputGroupStyle = {
  marginBottom: '20px',
  textAlign: 'left'
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  color: '#374151',
  fontWeight: '500',
  fontSize: '0.95rem'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background 0.2s',
  marginTop: '10px'
};

const linkStyle = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '500'
};

export default Login;