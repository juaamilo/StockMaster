import React from 'react'

const Home = ({ listaProductos }) => {
  return (
    <div className="page-container">
      <h1>🏠 Panel de Control</h1>
      
      <div style={{ 
        background: '#ffffff', 
        padding: '25px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
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
          Total: {listaProductos ? listaProductos.length : 0} productos registrados
        </span>
      </div>

      <p>Bienvenido a Stock Master. Usa el menú para navegar.</p>
    </div>
  )
}

export default Home