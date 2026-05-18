/**
 * Barra de Navegación Principal (Navbar)
 * Ubicación: src/componentes/Navbar.jsx
 * Descripción: Componente de navegación con enlaces a secciones principales
 * y control de sesión (mostrar usuario y botón de logout).
 * 
 * Integración:
 * - Usa AuthContext para obtener el usuario actual y ejecutar logout
 * - Muestra enlaces condicionales según el estado de autenticación
 * - Diseño consistente con el sistema visual de Stock Master
 */

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  // Obtener funciones y estado desde el contexto global de autenticación
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Maneja el cierre de sesión
   * - Ejecuta la función logout del contexto (limpia localStorage y estado)
   * - Redirige al login
   */
  const handleLogout = () => {
    logout(); // Limpia token y estado global
    navigate('/login'); // Redirige a página de login
  };

  return (
    <nav className="navbar" style={navStyle}>
      <ul className="navbar-links" style={ulStyle}>
        
        {/* Enlaces de navegación principales */}
        <li style={liStyle}>
          <Link to="/" style={linkStyle}>🏠 Inicio</Link>
        </li>
        <li style={liStyle}>
          <Link to="/inventario" style={linkStyle}>📦 Inventario</Link>
        </li>
        <li style={liStyle}>
          <Link to="/nuevo" style={linkStyle}>➕ Nuevo Producto</Link>
        </li>
        
        {/* ========================================
            SECCIÓN DE USUARIO (Solo visible si está logueado)
            ======================================== */}
        {currentUser && (
          <>
            {/* Mostrar nombre del usuario */}
            <li style={liStyle}>
              <span style={userSpanStyle}>
                👤 {currentUser.nombre || currentUser.username}
              </span>
            </li>
            
            {/* Botón de Cerrar Sesión con estilo de alerta */}
            <li style={liStyle}>
              <button 
                onClick={handleLogout}
                style={logoutButtonStyle}
                title="Cerrar sesión actual"
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        )}
        
      </ul>
    </nav>
  );
};

/* 🎨 ESTILOS - Alineados con el diseño de Stock Master */

const navStyle = {
  background: '#fff',
  padding: '12px 20px',
  borderRadius: '12px',           // Mismo border-radius que tarjetas
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Sombra suave consistente
  marginBottom: '25px',
  position: 'sticky',             // Navbar se mantiene visible al hacer scroll
  top: '0',
  zIndex: '1000'
};

const ulStyle = {
  display: 'flex',
  flexWrap: 'wrap',               // Permite que los elementos bajen en móviles
  gap: '15px',                    // Espaciado uniforme entre elementos
  listStyle: 'none',
  margin: '0',
  padding: '0',
  alignItems: 'center',
  justifyContent: 'flex-start'
};

const liStyle = {
  display: 'flex',
  alignItems: 'center'
};

const linkStyle = {
  color: '#374151',               // Gris oscuro para texto principal
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1rem',
  padding: '8px 12px',
  borderRadius: '8px',
  transition: 'background 0.2s, color 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px'
};

// Efecto hover para enlaces (se puede complementar con CSS externo)
const linkHoverStyle = {
  ...linkStyle,
  background: '#f3f4f6',
  color: '#1e3a8a'
};

const userSpanStyle = {
  color: '#6b7280',
  fontSize: '0.95rem',
  fontWeight: '500',
  padding: '8px 12px',
  background: '#f9fafb',
  borderRadius: '8px',
  border: '1px solid #e5e7eb'
};

const logoutButtonStyle = {
  background: '#ef4444',          // Rojo de alerta consistente con el sistema
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '8px',            // Bordes redondeados consistentes
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '0.95rem',
  transition: 'background 0.2s',
  marginLeft: '5px'
};

export default Navbar;