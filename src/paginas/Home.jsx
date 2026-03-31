import React from 'react'

const Home = ({ listaProductos }) => {

  if (!Array.isArray(listaProductos)) {
    return <p>Cargando información...</p>
  }

  const totalProductos = listaProductos.length

  const bajoStock = listaProductos.filter(p => p.cantidad < 5).length

  const valorTotal = listaProductos.reduce(
    (acc, p) => acc + (p.precio * p.cantidad), 0
  )

  return (
    <div className="page-container">

      {/* 🏢 Encabezado */}
      <h1 style={{ marginBottom: '10px' }}>🏠 Panel de Control</h1>
      <h2 style={{ color: '#374151', marginBottom: '20px' }}>
        Pixelpitch - Sistema de Inventario
      </h2>

      {/* 📊 Tarjetas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>

        <div style={cardStyle}>
          <h4>📦 Equipos Registrados</h4>
          <p style={numberStyle}>{totalProductos}</p>
        </div>

        <div style={cardStyle}>
          <h4>⚠️ Componentes Críticos</h4>
          <p style={numberStyle}>{bajoStock}</p>
        </div>

        <div style={cardStyle}>
          <h4>💰 Valor del Inventario</h4>
          <p style={numberStyle}>
            ${valorTotal.toLocaleString()}
          </p>
        </div>

      </div>

      {/* ⚡ Acciones */}
      <div style={boxStyle}>
        <h3>⚡ Gestión rápida</h3>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button style={btnStyle}>➕ Registrar equipo</button>
          <button style={btnStyle}>🔍 Buscar componente</button>
          <button style={btnStyle}>📦 Ver inventario</button>
        </div>
      </div>

      {/* 🆕 Últimos registros */}
      <div>
        <h3>🆕 Últimos registros</h3>

        {totalProductos === 0 ? (
          <p>No hay equipos registrados aún.</p>
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

      {/* 📌 Descripción del sistema */}
      <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#6b7280' }}>
        Sistema diseñado para la gestión de inventario de pantallas LED,
        facilitando el control de componentes, mantenimiento y operaciones de Pixelpitch.
      </div>

    </div>
  )
}

/* 🎨 estilos */
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

const boxStyle = {
  background: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  marginBottom: '30px'
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