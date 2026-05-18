/**
 * Componente Principal de la Aplicación (App)
 * Ubicación: src/App.jsx
 * Descripción: Punto de entrada de la aplicación. Configura enrutamiento, 
 * gestión de estado global de autenticación y carga de datos del inventario.
 * 
 * Integraciones:
 * - AuthProvider: Proveedor de contexto para sesión de usuario
 * - ProtectedRoute: Wrapper para proteger rutas privadas
 * - Fetch API: Carga de productos desde el backend
 */

import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importar contexto de autenticación y protección de rutas
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './componentes/ProtectedRoute';

// Importar componentes UI
import Navbar from './componentes/Navbar';

// Importar datos iniciales y servicios
import { inventarioInicial } from './Datos/datosInventario';

// Importar páginas
import Home from './paginas/Home';
import Inventario from './paginas/Inventario';
import NuevoProducto from './paginas/NuevoProducto';
import DetalleProducto from './paginas/DetalleProducto';
import Login from './paginas/Login';
import Registro from './paginas/Registro';

/**
 * Componente interno que contiene la lógica principal de la app
 * Separamos esto para poder usar useContext(AuthContext) dentro de BrowserRouter
 */
function AppContent() {
  // Obtener estado de autenticación desde el contexto global
  const { currentUser, logout } = useContext(AuthContext);
  
  // Estado local para gestión de productos
  const [listaProductos, setListaProductos] = useState(inventarioInicial);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Carga productos desde el backend al montar el componente
   * Nota: URL ajustada a puerto 3000 para coincidir con backend configurado
   */
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      // ⚠️ Verificar que el puerto coincida con tu backend (3000 por defecto)
      const respuesta = await fetch('http://localhost:3000/articulos');
      
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      
      const datos = await respuesta.json();
      setListaProductos(datos);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message);
      // Fallback: usar datos iniciales si falla la conexión
      setListaProductos(inventarioInicial);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Agrega un nuevo producto a la lista local
   * @param {Object} productoNuevo - Datos del producto a agregar
   */
  const agregarProducto = (productoNuevo) => {
    setListaProductos(prev => [...prev, productoNuevo]);
  };

  return (
    <div style={appContainerStyle}>
      
      {/* HEADER: Visible solo si hay usuario autenticado */}
      {currentUser && (
        <header style={headerStyle}>
          <h1 style={titleStyle}>Stock Master</h1>
          <p style={subtitleStyle}>
            Gestión integral de LEDs, Pantallas y Repuestos
          </p>
        </header>
      )}

      {/* NAVBAR: Visible solo si hay usuario autenticado */}
      {currentUser && <Navbar user={currentUser} onLogout={logout} />}
      
      <main>
        {/* Estado de carga */}
        {cargando && (
          <div style={loadingStyle}>
            ⏳ Cargando sistema...
          </div>
        )}
        
        {/* Contenido principal (solo cuando no está cargando) */}
        {!cargando && (
          <Routes>
            {/* ========================================
                RUTAS PÚBLICAS
                ======================================== */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* ========================================
                RUTAS PRIVADAS (Protegidas con ProtectedRoute)
                ======================================== */}
            
            {/* Home / Dashboard */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home listaProductos={listaProductos} />
                </ProtectedRoute>
              } 
            />

            {/* Inventario principal */}
            <Route 
              path="/inventario" 
              element={
                <ProtectedRoute>
                  <Inventario listaProductos={listaProductos} />
                </ProtectedRoute>
              } 
            />
            
            {/* Nuevo producto */}
            <Route 
              path="/nuevo" 
              element={
                <ProtectedRoute>
                  <NuevoProducto onAgregarProducto={agregarProducto} />
                </ProtectedRoute>
              } 
            />
            
            {/* Detalle de producto */}
            <Route 
              path="/producto/:id" 
              element={
                <ProtectedRoute>
                  <DetalleProducto listaProductos={listaProductos} />
                </ProtectedRoute>
              } 
            />

            {/* ========================================
                RUTA COMODÍN: Redirigir desconocidas a login
                ======================================== */}
            <Route path="*" element={<Navigate to="/login" replace />} />
            
          </Routes>
        )}
      </main>

      {/* FOOTER: Visible solo si hay usuario autenticado */}
      {currentUser && (
        <footer style={footerStyle}>
          <p>Stock Master © 2024 - Proyecto Universitario</p>
        </footer>
      )}
    </div>
  );
}

/**
 * Componente raíz que envuelve todo con AuthProvider y BrowserRouter
 * Esta estructura permite que el contexto de auth esté disponible en toda la app
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

/* 🎨 ESTILOS - Consistentes con el diseño del sistema */

const appContainerStyle = {
  padding: '40px 2%',
  width: '100vw',
  margin: '0',
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  backgroundColor: '#f9fafb',
  minHeight: '100vh',
  boxSizing: 'border-box'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px'
};

const titleStyle = {
  color: '#1e3a8a',
  margin: '0',
  fontSize: '2.5rem'
};

const subtitleStyle = {
  color: '#6b7280',
  marginTop: '15px',
  fontSize: '1.2rem'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '40px',
  color: '#6b7280'
};

const footerStyle = {
  marginTop: '60px',
  textAlign: 'center',
  color: '#9ca3af',
  fontSize: '0.9rem',
  borderTop: '1px solid #e5e7eb',
  paddingTop: '20px'
};

export default App;