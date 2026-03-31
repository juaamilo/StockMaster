import React from 'react'
import TarjetaProducto from '../componentes/TarjetaProducto'

const Inventario = ({ listaProductos }) => {
  return (
    <div className="page-container">
      <h1>📦 Inventariado</h1>
      
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
        
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {listaProductos && listaProductos.map((producto) => (
            <TarjetaProducto 
              key={producto.id}
              producto={producto}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Inventario