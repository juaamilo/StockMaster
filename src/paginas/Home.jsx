import React from 'react'

const Home = ({ listaProductos }) => {

  // Validación segura
  if (!Array.isArray(listaProductos)) {
    return <p>Cargando productos...</p>
  }

  const totalProductos = listaProductos.length

  const bajoStock = listaProductos.filter(p => p.cantidad < 5).length

  const valorTotal = listaProductos.reduce(
    (acc, p) => acc + (p.precio * p.cantidad), 0
  )

  return (
    <div className="page-container">

      <h1 style={{ marginBottom: '20px' }}>🏠 Panel de Control</h1>

      {/* 🔹 Tarjetas resumen */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>

        <div style={cardStyle}>
          <h4>📦 Productos</h4>
          <p style={numberStyle}>{totalProductos}</p>
        </div>

        <div style={cardStyle}>
          <h4>⚠️ Bajo Stock</h4>
          <p style={numberStyle}>{bajoStock}</p>
        </div>

        <div style={cardStyle}>
          <h4>💰 Valor Total</h4>
          <p style={numberStyle}>
            ${valorTotal.toLocaleString()}
          </p>
        </div>

      </div>

      {/* 🔹 Acciones rápidas */}
      <div style={{
        background: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3>⚡ Acciones rápidas</h3>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          
          <button 
            style={btnStyle}
            onMouseOver={(e) => e.target.style.background = '#1e40af'}
            onMouseOut={(e) => e.target.style.background = '#2563eb'}
          >
            ➕ Agregar Producto
          </button>

          <button 
            style={btnStyle}
            onMouseOver={(e) => e.target.style.background = '#1e40af'}
            onMouseOut={(e) => e.target.style.background = '#2563eb'}
          >
            🔍 Buscar
          </button>

          <button 
            style={btnStyle}
            onMouseOver={(e) => e.target.style.background = '#1e40af'}
            onMouseOut={(e) => e.target.style.background = '#2563eb'}
          >
            📦 Inventario
          </button>

        </div>
      </div>

      {/* 🔹 Últimos productos */}
      <div>
        <h3>🆕 Últimos productos</h3>

        {totalProductos === 0 ? (
          <p>No hay productos registrados aún.</p>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            {listaProductos.slice(0, 5).map((p, i) => (
              <li key={i}>
                {p.nombre} - {p.cantidad} unidades
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

/* 🎨 Estilos */
const cardStyle = {
  background: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  textAlign: 'center'
}

const numberStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginTop: '10px'
}

const btnStyle = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer'
}

export default Home