import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../servicios/servicioAutenticacion'

const Navbar = ({ autenticado, usuarioActual, onLogout }) => {
  const manejarLogout = () => {
    logout();
    if (onLogout) onLogout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar" style={estilos.navbar}>
      <ul className="navbar-links" style={estilos.lista}>
        <li><Link to="/" style={estilos.enlace}>🏠 Inicio</Link></li>
        {autenticado && (
          <>
            <li><Link to="/inventario" style={estilos.enlace}>📦 Inventario</Link></li>
            <li><Link to="/nuevo" style={estilos.enlace}>➕ Nuevo Producto</Link></li>
          </>
        )}
      </ul>

      {/* Sección de autenticación en la derecha */}
      <div style={estilos.seccionAuth}>
        {autenticado ? (
          <div style={estilos.usuarioAutenticado}>
            <span style={estilos.nombreUsuario}>
              👤 {usuarioActual?.nombre || usuarioActual?.usuario}
            </span>
            <button
              onClick={manejarLogout}
              style={estilos.botonLogout}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        ) : (
          <div style={estilos.usuarioNoAutenticado}>
            <Link to="/login" style={estilos.enlaceAuth}>🔐 Iniciar Sesión</Link>
            <Link to="/registro" style={estilos.enlaceAuth}>📝 Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

const estilos = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    borderRadius: '8px',
    padding: '12px 20px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  lista: {
    display: 'flex',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    gap: '30px',
    flex: 1
  },
  enlace: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.2s',
    cursor: 'pointer'
  },
  seccionAuth: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  usuarioAutenticado: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  nombreUsuario: {
    color: 'white',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '8px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px'
  },
  botonLogout: {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s'
  },
  usuarioNoAutenticado: {
    display: 'flex',
    gap: '10px'
  },
  enlaceAuth: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '8px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    cursor: 'pointer'
  }
}

export default Navbar