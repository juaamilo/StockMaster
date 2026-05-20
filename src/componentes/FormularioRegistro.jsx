import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registrarse } from '../servicios/servicioAutenticacion';

function FormularioRegistro() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  const [datosRegistro, setDatosRegistro] = useState({
    nombre: '',
    usuario: '',
    contrasena: '',
    contrasenaConfirm: '',
    id_tipo: '1',
    direccion: ''
  });

  // Manejar cambios en los inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosRegistro({
      ...datosRegistro,
      [name]: value
    });
    setError(null); // Limpiar errores cuando el usuario escribe
  };

  // Validar el formulario
  const validarFormulario = () => {
    if (!datosRegistro.nombre.trim()) {
      setError('El nombre es requerido');
      return false;
    }
    if (!datosRegistro.usuario.trim()) {
      setError('El usuario es requerido');
      return false;
    }
    if (datosRegistro.usuario.length < 4) {
      setError('El usuario debe tener al menos 4 caracteres');
      return false;
    }
    if (!datosRegistro.contrasena) {
      setError('La contraseña es requerida');
      return false;
    }
    if (datosRegistro.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (datosRegistro.contrasena !== datosRegistro.contrasenaConfirm) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (!datosRegistro.direccion.trim()) {
      setError('La dirección es requerida');
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
      // Preparar datos sin el campo de confirmación de contraseña
      const datosParaRegistro = {
        nombre: datosRegistro.nombre,
        usuario: datosRegistro.usuario,
        contrasena: datosRegistro.contrasena,
        id_tipo: Number(datosRegistro.id_tipo),
        direccion: datosRegistro.direccion
      };

      await registrarse(datosParaRegistro);
      setExito(true);
      
      // Disparar evento para notificar cambios de autenticación
      window.dispatchEvent(new Event('storage'));
      
      // Redirigir a la página de inicio después de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (exito) {
    return (
      <div style={estilos.contenedorExito}>
        <div style={estilos.cajaExito}>
          <h2 style={estilos.tituloExito}>✅ ¡Registro Exitoso!</h2>
          <p style={estilos.textoExito}>Tu cuenta ha sido creada correctamente.</p>
          <p style={estilos.textoExito}>Serás redirigido en breve...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.caja}>
        <h2 style={estilos.titulo}>📝 Crear Cuenta</h2>
        
        {error && (
          <div style={estilos.error}>
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio} style={estilos.formulario}>
          {/* Nombre */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="nombre" style={estilos.etiqueta}>Nombre Completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={datosRegistro.nombre}
              onChange={manejarCambio}
              placeholder="Juan Pérez"
              style={estilos.input}
              disabled={cargando}
            />
          </div>

          {/* Usuario */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="usuario" style={estilos.etiqueta}>Nombre de Usuario *</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={datosRegistro.usuario}
              onChange={manejarCambio}
              placeholder="juan123"
              style={estilos.input}
              disabled={cargando}
            />
            <small style={estilos.ayuda}>Mínimo 4 caracteres</small>
          </div>

          {/* Contraseña */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="contrasena" style={estilos.etiqueta}>Contraseña *</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={datosRegistro.contrasena}
              onChange={manejarCambio}
              placeholder="••••••••"
              style={estilos.input}
              disabled={cargando}
            />
            <small style={estilos.ayuda}>Mínimo 6 caracteres</small>
          </div>

          {/* Confirmar Contraseña */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="contrasenaConfirm" style={estilos.etiqueta}>Confirmar Contraseña *</label>
            <input
              type="password"
              id="contrasenaConfirm"
              name="contrasenaConfirm"
              value={datosRegistro.contrasenaConfirm}
              onChange={manejarCambio}
              placeholder="••••••••"
              style={estilos.input}
              disabled={cargando}
            />
          </div>

          {/* Tipo de Persona */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="id_tipo" style={estilos.etiqueta}>Tipo de Persona *</label>
            <select
              id="id_tipo"
              name="id_tipo"
              value={datosRegistro.id_tipo}
              onChange={manejarCambio}
              style={estilos.select}
              disabled={cargando}
            >
              <option value="1">Admin</option>
              <option value="2">Operario</option>
              <option value="3">Gerente</option>
            </select>
          </div>

          {/* Dirección */}
          <div style={estilos.grupoFormulario}>
            <label htmlFor="direccion" style={estilos.etiqueta}>Dirección *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={datosRegistro.direccion}
              onChange={manejarCambio}
              placeholder="Calle Principal 123"
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
            {cargando ? '⏳ Registrando...' : '✅ Crear Cuenta'}
          </button>
        </form>

        {/* Link a Login */}
        <p style={estilos.pie}>
          ¿Ya tienes cuenta? <Link to="/login" style={estilos.enlace}>Inicia sesión aquí</Link>
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
    maxWidth: '500px',
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
  select: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  ayuda: {
    fontSize: '0.85rem',
    color: '#6b7280'
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
  },
  contenedorExito: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  },
  cajaExito: {
    backgroundColor: '#dcfce7',
    border: '2px solid #4ade80',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '400px'
  },
  tituloExito: {
    color: '#166534',
    fontSize: '1.5rem',
    margin: '0 0 15px 0'
  },
  textoExito: {
    color: '#166534',
    fontSize: '1rem',
    margin: '8px 0'
  }
};

export default FormularioRegistro;
