import React, { useState } from 'react'

const Home = ({ listaProductos }) => {

  if (!Array.isArray(listaProductos)) {
    return <p>Cargando información...</p>
  }

  //  búsqueda
  const [busqueda, setBusqueda] = useState("")

  const productosFiltrados = listaProductos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  //  métricas
  const totalProductos = listaProductos.length

  const bajoStock = listaProductos.filter(p => p.stock < 10).length

  const valorTotal = listaProductos.reduce(
    (acc, p) => acc + (p.precio * p.stock), 0
  )

  const productoMasCaro = listaProductos.reduce((max, p) =>
    p.precio > (max?.precio || 0) ? p : max
  , null)

  //  estado del sistema
  const estadoSistema =
    bajoStock > 5 ? "Crítico" :
    bajoStock > 0 ? "Advertencia" :
    "Óptimo"

  return (
    <div className="page-container">

      <h1>🏠 Panel de Control</h1>
      <h2 style={{ color: '#374151' }}>
        Pixelpitch - Sistema de Inventario
      </h2>

      {/*  Buscador */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={inputStyle}
      />

      {/*  Alerta */}
      {bajoStock > 0 && (
        <div style={alertStyle}>
          ⚠️ Hay {bajoStock} productos con bajo stock
        </div>
      )}

      {/*  Tarjetas */}
      <div style={gridStyle}>

        <div style={cardStyle}>
          <h4>📦 Productos</h4>
          <p style={numberStyle}>{totalProductos}</p>
        </div>

        <div style={cardStyle}>
          <h4>⚠️ Bajo Stock</h4>
          <p style={numberStyle}>{bajoStock}</p>
        </div>

        <div style={cardStyle}>
          <h4>💰 Valor Inventario</h4>
          <p style={numberStyle}>
            ${valorTotal.toLocaleString()}
          </p>
        </div>

        <div style={cardStyle}>
          <h4>🧠 Estado</h4>
          <p style={numberStyle}>{estadoSistema}</p>
        </div>

      </div>

      {/* 🏆 Producto más caro */}
      {productoMasCaro && (
        <div style={boxStyle}>
          <h3>🏆 Producto más costoso</h3>
          <p>
            {productoMasCaro.nombre} - ${productoMasCaro.precio.toLocaleString()}
          </p>
        </div>
      )}

      {/* 📋 Lista filtrada */}
      <div>
        <h3>📋 Resultados</h3>

        {productosFiltrados.length === 0 ? (
          <p>No se encontraron productos</p>
        ) : (
          <ul>
            {productosFiltrados.slice(0, 5).map(p => (
              <li key={p.id}>
                {p.nombre} - Stock: {p.stock}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

/* 🎨 estilos */
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  margin: '20px 0'
}

const cardStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  textAlign: 'center'
}

const numberStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold'
}

const alertStyle = {
  background: '#fee2e2',
  color: '#991b1b',
  padding: '10px',
  borderRadius: '8px',
  margin: '15px 0'
}

const boxStyle = {
  background: '#f9fafb',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '20px'
}

const inputStyle = {
  padding: '10px',
  width: '100%',
  margin: '15px 0',
  borderRadius: '8px',
  border: '1px solid #ccc'
}

export default Home