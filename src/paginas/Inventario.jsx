import React, { useState } from 'react'
import TarjetaProducto from '../componentes/TarjetaProducto'

const Inventario = ({ listaProductos }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('')

  const productosFiltrados = listaProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  )

  return (
    <div className="page-container">
      <h1>📦 Inventario</h1>
      
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

        <div style={{
          marginBottom: '25px',
          position: 'relative',
          maxWidth: '500px'
        }}>
          <svg 
            style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: '#6b7280'
            }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>

          <input
            type="text"
            placeholder="Buscar producto por nombre..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 15px 12px 50px',
              fontSize: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <TarjetaProducto 
                key={producto.id}
                producto={producto}
              />
            ))
          ) : (
            <li style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280',
              fontSize: '1.1rem',
              background: '#f9fafb',
              borderRadius: '10px',
              border: '2px dashed #e5e7eb'
            }}>
              🔍 Producto no encontrado
              <br />
              <small style={{ display: 'block', marginTop: '10px', color: '#9ca3af' }}>
                Intenta con otro nombre
              </small>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Inventario