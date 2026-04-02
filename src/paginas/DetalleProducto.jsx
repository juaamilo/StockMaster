import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DetalleProducto = ({ listaProductos }) => {
  const { id } = useParams()  // Obtiene el ID de la URL
  const navigate = useNavigate()  // Para poder volver
  
  // Busca el producto en la lista
  const producto = listaProductos?.find(p => p.id === Number(id))

  // Si no encuentra el producto
  if (!producto) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h1>⚠️ Producto no encontrado</h1>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          El producto con ID #{id} no existe en el inventario.
        </p>
        <button 
          onClick={() => navigate('/inventario')}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          ← Volver al Inventario
        </button>
      </div>
    )
  }

  // Si encuentra el producto, lo muestra
  return (
    <div className="page-container">
      {/* Botón para volver */}
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: '#6b7280',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← Volver al Inventario
      </button>

      {/* Tarjeta de Detalle del Producto */}
      <div style={{
        background: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto',
        borderLeft: '5px solid #3b82f6'
      }}>
        <h1 style={{ 
          color: '#1f2937', 
          margin: '0 0 20px 0',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '15px'
        }}>
          📋 {producto.nombre}
        </h1>

        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ color: '#6b7280' }}>ID del Producto:</strong>
            <span>#{producto.id}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ color: '#6b7280' }}>Categoría:</strong>
            <span style={{
              background: '#dbeafe',
              color: '#1e40af',
              padding: '4px 12px',
              borderRadius: '15px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {producto.categoria}
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ color: '#6b7280' }}>Stock Disponible:</strong>
            <span style={{
              fontWeight: 'bold',
              color: producto.stock < 10 ? '#dc2626' : '#059669',
              fontSize: '1.1rem'
            }}>
              {producto.stock} unidades
              {producto.stock < 10 && ' ⚠️ Stock bajo'}
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ color: '#6b7280' }}>Precio Unitario:</strong>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1e40af' 
            }}>
              ${producto.precio?.toLocaleString('es-CO') || producto.precio} COP
            </span>
          </div>
        </div>

        {/* Botones de acción (opcional - para el futuro) */}
        <div style={{ 
          marginTop: '30px', 
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex', 
          gap: '10px',
          justifyContent: 'center'
        }}>
          <button style={{
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}>
            ✏️ Editar Producto
          </button>
          <button style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto