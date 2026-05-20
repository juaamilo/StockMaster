import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../servicios/servicioAutenticacion';

function FormularioLogin({ onLoginExitoso }) {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const [credenciales, setCredenciales] = useState({
    usuario: '',
    contrasena: ''
  });

  // Manejar cambios en los inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCredenciales({
      ...credenciales,
      [name]: value
    });
    setError(null); // Limpiar errores cuando el usuario escribe
  };

  // Validar el formulario
  const validarFormulario = () => {
    if (!credenciales.usuario.trim()) {
      setError('El usuario es requerido');
      return false;
    }
    if (!credenciales.contrasena) {
      setError('La contraseña es requerida');
      return false;
    }
    return true;
  };

  // Manejar envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const resultado = await login(credenciales.usuario, credenciales.contrasena);
      
      // Llamar callback si existe
      if (onLoginExitoso) {
        onLoginExitoso(resultado);
      }

      // Redirigir a la página de inicio después de un pequeño delay
      // para asegurar que el localStorage se ha actualizado
      setTimeout(() => {
        navigate('/');
        // Disparar evento para notificar cambios de autenticación
        window.dispatchEvent(new Event('storage'));
      }, 100);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.caja}>
        <h2 style={estilos.titulo}>🔐 Iniciar Sesión</h2>
        
        {error && (
          <div style={estilos.error}>
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio} style={estilos.formulario}>
          {/* Usuario */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="usuario" style={estilos.etiqueta}>Usuario *</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={credenciales.usuario}
              onChange={manejarCambio}
              placeholder="juan123"
              style={estilos.input}
              disabled={cargando}
              autoFocus
            />
          </div>

          {/* Contraseña */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="contrasena" style={estilos.etiqueta}>Contraseña *</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={credenciales.contrasena}
              onChange={manejarCambio}
              placeholder="••••••••"
              style={estilos.input}
              disabled={cargando}
            />
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            style={{
              ...estilos.boton,
              opacity: cargando ? 0.6 : 1,
              cursor: cargando ? 'not-allowed' : 'pointer'
            }}
            disabled={cargando}
          >
            {cargando ? '⏳ Iniciando...' : '🔓 Entrar'}
          </button>
        </form>

        {/* Links */}
        <p style={estilos.pie}>
          ¿No tienes cuenta? <Link to="/registro" style={estilos.enlace}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

const estilos = {
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '20px'
  },
  caja: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '400px',
    width: '100%'
  },
  titulo: {
    color: '#1e3a8a',
    fontSize: '1.8rem',
    marginBottom: '30px',
    textAlign: 'center',
    margin: '0 0 30px 0'
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #fecaca',
    fontSize: '0.95rem'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  grupoFormulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  etiqueta: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  boton: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    padding: '12px 16px',
    fontSize: '1rem',
    borderRadius: '4px',
    fontWeight: '600',
    marginTop: '10px',
    transition: 'background-color 0.2s'
  },
  pie: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#6b7280',
    fontSize: '0.95rem'
  },
  enlace: {
    color: '#1e3a8a',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default FormularioLogin;
