import React, { useState } from 'react'

const Home = ({ listaProductos }) => {

  if (!Array.isArray(listaProductos)) {
    return <p>Cargando información...</p>
  }

  const [busqueda, setBusqueda] = useState("")

  // 🔎 BÚSQUEDA (nombre + código)
  const productosFiltrados = listaProductos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(p.id).includes(busqueda)
  )

  // 📊 MÉTRICAS
  const totalProductos = listaProductos.length

  const bajoStock = listaProductos.filter(p => p.stock <= 5)
  const altoStock = listaProductos.filter(p => p.stock >= 150)

  const valorTotal = listaProductos.reduce(
    (acc, p) => acc + (p.precio * p.stock), 0
  )

  const productoMasCaro = listaProductos.reduce((max, p) =>
    p.precio > (max?.precio || 0) ? p : max
  , null)

  // 🧠 ESTADO DEL SISTEMA
  const estadoSistema =
    bajoStock.length > 0 ? "Crítico" :
    altoStock.length > 0 ? "Sobrestock" :
    "Óptimo"

  const colorEstado =
    estadoSistema === "Crítico" ? "#dc2626" :
    estadoSistema === "Sobrestock" ? "#2563eb" :
    "#16a34a"

  return (
    <div className="page-container">

      <h1>🏠 Panel de Control</h1>
      <h2 style={{ color: '#374151' }}>
        Pixelpitch - Sistema de Inventario
      </h2>

      {/* 🔎 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar por nombre o código..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={inputStyle}
      />

      {/* ⚠️ ALERTAS */}
      {bajoStock.length > 0 && (
        <div style={alertRed}>
          ⚠️ {bajoStock.length} productos con stock crítico (≤ 5)
        </div>
      )}

      {altoStock.length > 0 && (
        <div style={alertBlue}>
          📦 {altoStock.length} productos con sobrestock (≥ 150)
        </div>
      )}

      {/* 📊 DASHBOARD (TARJETAS) */}
      <div style={gridStyle}>

        <div style={cardStyle}>
          <h4>📦 Productos</h4>
          <p style={numberStyle}>{totalProductos}</p>
        </div>

        <div style={cardStyle}>
          <h4>⚠️ Bajo Stock</h4>
          <p style={{ ...numberStyle, color: '#dc2626' }}>
            {bajoStock.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h4>📦 Sobrestock</h4>
          <p style={{ ...numberStyle, color: '#2563eb' }}>
            {altoStock.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h4>💰 Inventario</h4>
          <p style={numberStyle}>
            ${valorTotal.toLocaleString()}
          </p>
        </div>

        <div style={cardStyle}>
          <h4>🧠 Estado</h4>
          <p style={{ ...numberStyle, color: colorEstado }}>
            {estadoSistema}
          </p>
        </div>

      </div>
      <p style={{ color: '#6b7280', marginBottom: '15px' }}>
  Distribución del estado actual del inventario
</p>

      {/* 📊 GRÁFICO CIRCULAR */}
<div style={chartBox}>
  <h3 style={{ marginBottom: '20px' }}>📊 Estado del Inventario</h3>

  {/* cálculos */}
  {(() => {
    const critico = bajoStock.length
    const sobrestock = altoStock.length
    const optimo = totalProductos - critico - sobrestock

    const total = totalProductos || 1

    const p1 = (critico / total) * 100
    const p2 = (sobrestock / total) * 100
    const p3 = (optimo / total) * 100

    return (
      <>
        {/* 🔵 DONA */}
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          margin: '20px auto',
          background: `conic-gradient(
            #dc2626 0% ${p1}%,
            #2563eb ${p1}% ${p1 + p2}%,
            #16a34a ${p1 + p2}% 100%
          )`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* centro */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {totalProductos}
          </div>
        </div>

        {/* 📋 LEYENDA */}
        <div style={{ marginTop: '10px' }}>

          <p>
            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>●</span>
            {' '}Crítico: {critico} ({p1.toFixed(1)}%)
          </p>

          <p>
            <span style={{ color: '#2563eb', fontWeight: 'bold' }}>●</span>
            {' '}Sobrestock: {sobrestock} ({p2.toFixed(1)}%)
          </p>

          <p>
            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>●</span>
            {' '}Óptimo: {optimo} ({p3.toFixed(1)}%)
          </p>

        </div>
      </>
    )
  })()}

</div>

      {/* 🏆 PRODUCTO DESTACADO */}
      {productoMasCaro && (
        <div style={boxStyle}>
          <h3>🏆 Producto más costoso</h3>
          <p>
            {productoMasCaro.nombre} — ${productoMasCaro.precio.toLocaleString()}
          </p>
        </div>
      )}

      {/* 📋 RESULTADOS */}
      <div>
        <h3>📋 Resultados</h3>

        {productosFiltrados.length === 0 ? (
          <p style={{ color: '#dc2626' }}>
            Producto no existente
          </p>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            {productosFiltrados.slice(0, 6).map(p => (
              <li key={p.id} style={itemStyle}>
                <strong>{p.nombre}</strong> — Stock: {p.stock}
                {p.stock <= 5 && <span style={tagRed}>Crítico</span>}
                {p.stock >= 150 && <span style={tagBlue}>Alto</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

/* 🎨 ESTILOS */

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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

const chartBox = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  marginTop: '20px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}

const barContainer = {
  marginBottom: '10px'
}

const barStyle = {
  height: '10px',
  borderRadius: '5px',
  transition: 'width 0.5s ease'
}

const alertRed = {
  background: '#fee2e2',
  color: '#991b1b',
  padding: '10px',
  borderRadius: '8px',
  margin: '10px 0'
}

const alertBlue = {
  background: '#dbeafe',
  color: '#1e40af',
  padding: '10px',
  borderRadius: '8px',
  margin: '10px 0'
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

const itemStyle = {
  marginBottom: '8px'
}

const tagRed = {
  marginLeft: '10px',
  color: '#fff',
  background: '#dc2626',
  padding: '3px 8px',
  borderRadius: '6px',
  fontSize: '0.8rem'
}

const tagBlue = {
  marginLeft: '10px',
  color: '#fff',
  background: '#2563eb',
  padding: '3px 8px',
  borderRadius: '6px',
  fontSize: '0.8rem'
}

export default Home