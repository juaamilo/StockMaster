import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser({ nombre, email, password });
      alert('Usuario registrado con éxito. Por favor inicia sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.error || 'Error al registrar usuario');
    }
  };

  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Registrarse</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
        <input 
          type="text" 
          placeholder="Nombre completo" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#10b981', color: 'white', border: 'none' }}>
          Crear Cuenta
        </button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Registro;