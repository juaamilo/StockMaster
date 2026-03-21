// En esta parte conectamos los datos del inventario, el componente TarjetaProducto y formulario producto

// usamos el useState para importar el estado de react y manejar la lista de productos, y también importamos el formulario para agregar nuevos productos al inventario. Además, importamos los datos iniciales del inventario desde un archivo separado.
import { useState } from 'react';

import FormularioProducto from './componentes/FormularioProducto';
// 1. IMPORTAMOS LOS DATOS (La "Base de Datos" simulada)
import { inventarioInicial } from './datos/datosInventario';

// 2. IMPORTAMOS EL COMPONENTE (La tarjeta visual de cada producto)
import TarjetaProducto from './componentes/TarjetaProducto';

function App() {
  const [listaProductos, setListaProductos] = useState(inventarioInicial);
  const agregarProducto = (productoNuevo) => {
  setListaProductos([...listaProductos, productoNuevo]);
};
  return (
    // Contenedor Principal
    // Cambios clave: padding adaptable (5%) y sin maxWidth para ocupar toda la pantalla en PC
    <div style={{ 
      padding: '40px 2%',          // Margen lateral muy pequeño (2%) para que no toque el borde crudo
      width: '100vw',              // 100% del Viewport (ancho de ventana visible)
      margin: '0',                 // Sin márgenes externos
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',          // 100% del alto de ventana
      boxSizing: 'border-box'      
    }}>
      
      {/* Encabezado del Sistema */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          color: '#1e3a8a', 
          margin: '0', 
          fontSize: '2.5rem',      // Título grande y claro
          letterSpacing: '-0.5px'
        }}>
          📦 Stock Master
        </h1>
        
        {/* Slogan con margen superior para separarlo del título */}
        <p style={{ 
          color: '#6b7280', 
          marginTop: '15px',       
          fontSize: '1.2rem',
          fontWeight: '300'
        }}>
          Gestión integral de LEDs, Pantallas y Repuestos
        </p>
      </header>
      
      {/* Tarjeta de Resumen General */}
      {/* Formulario para agregar productos */}
      <FormularioProducto onAgregarProducto={agregarProducto} />
      <div style={{ 
        background: '#ffffff', 
        padding: '25px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',          // Responsivo: se adapta si la pantalla es muy estrecha
        gap: '15px'
      }}>
        <h3 style={{ margin: 0, color: '#374151', fontSize: '1.3rem' }}>
          📊 Resumen General
        </h3>
        <span style={{ 
          background: '#dbeafe', 
          color: '#1e40af', 
          padding: '10px 20px', 
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}>
          Total: {inventarioInicial.length} productos registrados
        </span>
      </div>

      {/* Sección de Lista de Productos */}
      <section>
        <h2 style={{ 
          borderBottom: '3px solid #3b82f6', 
          paddingBottom: '12px', 
          color: '#1f2937',
          marginBottom: '25px',
          fontSize: '1.8rem'
        }}>
          Listado de Inventario
        </h2>
        
        {/* Contenedor de la lista (UL) */}
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          
          {/* 3. EL BUCLE MÁGICO (.map) */}
          {/* Recorremos cada producto y generamos una tarjeta automática */}
          {listaProductos.map((producto) => (
            <TarjetaProducto 
              key={producto.id}       // Clave única obligatoria para React
              producto={producto}     // Enviamos todos los datos del producto
            />
          ))}
          
        </ul>
      </section>

      {/* Pie de página */}
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
  );
}

export default App;