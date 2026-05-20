import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';

const Registro = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
    nombre: '',
    direccion: '',
    id_tipo: '2' // Por defecto: Vendedor (ajusta según tus IDs reales de TipoPersona)
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convertir id_tipo a número entero antes de enviar
      const datosEnvio = { 
        ...formData, 
        id_tipo: parseInt(formData.id_tipo) 
      };
      
      await authService.register(datosEnvio);
      
      // Redirigir al login tras registro exitoso
      navigate('/login'); 
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>📝 Crear Cuenta</h2>
        <p style={{ color: '#6b7280', marginBottom: '25px' }}>
          Pixelpitch - Sistema de Inventario
        </p>
        
        {error && <div style={alertStyle}>⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Nombre Completo */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nombre Completo</label>
            <input 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
              style={inputStyle} 
              placeholder="Ej: Juan Pérez" 
            />
          </div>

          {/* Usuario */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Usuario</label>
            <input 
              name="usuario" 
              value={formData.usuario} 
              onChange={handleChange} 
              required 
              style={inputStyle} 
              placeholder="Ej: jperez" 
            />
          </div>

          {/* Contraseña */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <input 
              name="contrasena" 
              type="password" 
              value={formData.contrasena} 
              onChange={handleChange} 
              required 
              style={inputStyle} 
              placeholder="Mínimo 6 caracteres" 
            />
          </div>

          {/* Dirección (Opcional) */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Dirección</label>
            <input 
              name="direccion" 
              value={formData.direccion} 
              onChange={handleChange} 
              style={inputStyle} 
              placeholder="Opcional" 
            />
          </div>

          {/* Tipo de Usuario */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Tipo de Usuario</label>
            <select 
              name="id_tipo" 
              value={formData.id_tipo} 
              onChange={handleChange} 
              style={inputStyle}
            >
              {/* ⚠️ Ajusta estos valores según los IDs reales de tu tabla TipoPersona */}
              <option value="1">Administrador</option>
              <option value="2">Vendedor</option>
              <option value="3">Operario</option>
              <option value="4">Gerente</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
        
        <p style={{ marginTop: '25px', color: '#6b7280', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={linkStyle}>
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

/* 🎨 ESTILOS - Consistentes con Login.jsx y Home.jsx */
const containerStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: '100vh', background: '#f9fafb', padding: '20px'
};
const cardStyle = {
  background: '#fff', padding: '30px', borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%',
  maxWidth: '450px', textAlign: 'center'
};
const alertStyle = {
  background: '#fee2e2', color: '#991b1b', padding: '12px',
  borderRadius: '8px', marginBottom: '20px', border: '1px solid #fca5a5',
  fontSize: '0.9rem', textAlign: 'left'
};
const inputGroupStyle = { marginBottom: '15px', textAlign: 'left' };
const labelStyle = {
  display: 'block', marginBottom: '6px', color: '#374151',
  fontWeight: '500', fontSize: '0.95rem'
};
const inputStyle = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid #d1d5db', fontSize: '1rem', boxSizing: 'border-box'
};
const buttonStyle = {
  width: '100%', padding: '12px', background: '#16a34a', color: 'white',
  border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '500',
  cursor: 'pointer', marginTop: '10px', transition: 'opacity 0.2s'
};
const linkStyle = { color: '#2563eb', textDecoration: 'none', fontWeight: '500' };

export default Registro;