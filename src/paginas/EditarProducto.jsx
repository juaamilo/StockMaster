import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormularioProducto from '../componentes/FormularioProducto'

const EditarProducto = ({ listaProductos }) => {
  const { codigo } = useParams()
  const navigate = useNavigate()

  // Buscar el producto a editar
  const producto = listaProductos?.find(p => String(p.codigo) === String(codigo))

  // Si no encuentra el producto
  if (!producto) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h1>⚠️ Producto no encontrado</h1>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          El producto con código {codigo} no existe en el inventario.
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

  // Si encuentra el producto, mostrar el formulario de edición
  return (
    <div className="page-container">
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
        ← Volver
      </button>

      <h1 style={{
        color: '#1f2937',
        marginBottom: '30px',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '15px'
      }}>
        ✏️ Editar Producto: {producto.nombre}
      </h1>

      <FormularioProducto 
        productoEditar={producto}
        modo="editar"
      />
    </div>
  )
}

export default EditarProducto
