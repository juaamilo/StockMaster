import React from 'react'
import { Link } from 'react-router-dom'

const TarjetaProducto = ({ producto }) => {
  return (
    <li style={{ 
      background: '#ffffff',
      marginBottom: '15px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      borderLeft: '5px solid #3b82f6'
    }}>
      <div>
        <h3 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>
          {producto.nombre}
        </h3>
        <p style={{ margin: '5px 0', color: '#6b7280' }}>
          <strong>Stock:</strong> {producto.stock} unidades
        </p>
        <p style={{ margin: '5px 0', color: '#6b7280' }}>
          <strong>Precio:</strong> ${producto.precio.toLocaleString('es-CO')} COP
        </p>
        <span style={{
          background: producto.stock < 10 ? '#fee2e2' : '#dbeafe',
          color: producto.stock < 10 ? '#dc2626' : '#1e40af',
          padding: '5px 12px',
          borderRadius: '15px',
          fontSize: '0.85rem',
          fontWeight: 'bold'
        }}>
          {producto.categoria}
        </span>
      </div>
      
      {/* Botón para ver detalle */}
      <Link 
        to={`/producto/${producto.id}`}
        style={{
          background: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'background 0.3s'
        }}
      >
        📋 Ver Detalle
      </Link>
    </li>
  )
}

export default TarjetaProducto