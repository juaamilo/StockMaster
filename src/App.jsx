// ─────────────────────────────────────────────────────────────
//  IMPORTS
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import FormularioProducto from './componentes/FormularioProducto';
import TarjetaProducto from './componentes/TarjetaProducto';
import { inventarioInicial } from './Datos/datosInventario';

// Importar las 4 páginas (¡OJO! carpeta "paginas" en minúscula)
import Home from './paginas/Home';
import Inventario from './paginas/Inventario';
import NuevoProducto from './paginas/NuevoProducto';
import DetalleProducto from './paginas/DetalleProducto';

// ─────────────────────────────────────────────────────────────
//  COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────
function App() {
  const [listaProductos, setListaProductos] = useState(inventarioInicial);

  const agregarProducto = (productoNuevo) => {
    setListaProductos([...listaProductos, productoNuevo]);
  };

  return (
    <BrowserRouter>
      <div style={{ 
        padding: '40px 2%',
        width: '100vw',
        margin: '0',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        boxSizing: 'border-box'      
      }}>
        
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ 
            color: '#1e3a8a', 
            margin: '0', 
            fontSize: '2.5rem',
            letterSpacing: '-0.5px'
          }}>
            📦 Stock Master
          </h1>
          
          <p style={{ 
            color: '#6b7280', 
            marginTop: '15px',       
            fontSize: '1.2rem',
            fontWeight: '300'
          }}>
            Gestión integral de LEDs, Pantallas y Repuestos
          </p>
        </header>

        {/* NAVBAR */}
        <Navbar />
        
        {/* RUTAS DE LAS PÁGINAS */}
        <main>
          <Routes>
            <Route path="/" element={<Home listaProductos={listaProductos} />} />
            <Route path="/inventario" element={<Inventario listaProductos={listaProductos} />} />
            <Route path="/nuevo" element={<NuevoProducto onAgregarProducto={agregarProducto} />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer style={{ 
          marginTop: '60px', 
          textAlign: 'center', 
          color: '#9ca3af', 
          fontSize: '0.9rem',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '20px'
        }}>
          <p>Stock Master © 2024 - Proyecto Universitario</p>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Desarrollo Frontend con React</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;