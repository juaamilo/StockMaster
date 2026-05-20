import React, { useState } from 'react'

const Home = ({ listaProductos }) => {

  if (!Array.isArray(listaProductos)) {
    return <p style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>Cargando información...</p>
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
    <div className="page-container" style={pageStyle}>

      {/* ENCABEZADO ORDENADO */}
      <header style={{ marginBottom: '25px' }}>
        <h1 style={mainTitleStyle}>🏠 Panel de Control</h1>
        <h2 style={subtitleStyle}>Pixelpitch - Sistema de Inventario</h2>
      </header>

      {/* 🔎 BUSCADOR ALINEADO */}
      <input
        type="text"
        placeholder="Buscar por nombre o código..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={inputStyle}
      />

      {/* ⚠️ ALERTAS ESPACIADAS */}
      {bajoStock.length > 0 && (
        <div style={alertRed}>
          ⚠️ <strong>{bajoStock.length}</strong> productos con stock crítico 
        </div>
      )}

      {altoStock.length > 0 && (
        <div style={alertBlue}>
          📦 <strong>{altoStock.length}</strong> productos con sobrestock 
        </div>
      )}

      {/* 📊 DASHBOARD (CUADRÍCULA PROFESIONAL) */}
      <div style={gridStyle}>

        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>📦 Productos</h4>
          <p style={numberStyle}>{totalProductos}</p>
        </div>

        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>⚠️ Bajo Stock</h4>
          <p style={{ ...numberStyle, color: '#dc2626' }}>{bajoStock.length}</p>
        </div>

        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>📦 Sobrestock</h4>
          <p style={{ ...numberStyle, color: '#2563eb' }}>{altoStock.length}</p>
        </div>

        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>💰 Inventario</h4>
          <p style={{ ...numberStyle, color: '#111827' }}>${valorTotal.toLocaleString()}</p>
        </div>

        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>🧠 Estado</h4>
          <p style={{ ...numberStyle, color: colorEstado }}>{estadoSistema}</p>
        </div>

      </div>
      
      <p style={{ color: '#6b7280', marginBottom: '15px', fontSize: '0.9rem', paddingLeft: '5px' }}>
        Distribución del estado actual del inventario
      </p>

      {/* 📊 GRÁFICO CIRCULAR CENTRADO Y CON ELEMENTOS ALINEADOS */}
      <div style={chartBox}>
        <h3 style={sectionTitleStyle}>📊 Estado del Inventario</h3>

        {(() => {
          const critico = bajoStock.length
          const sobrestock = altoStock.length
          const optimo = totalProductos - critico - sobrestock

          const total = totalProductos || 1

          const p1 = (critico / total) * 100
          const p2 = (sobrestock / total) * 100
          const p3 = (optimo / total) * 100

          return (
            <div style={chartFlexContainer}>
              {/* 🔵 DONA */}
              <div style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: `conic-gradient(
                  #dc2626 0% ${p1}%,
                  #2563eb ${p1}% ${p1 + p2}%,
                  #16a34a ${p1 + p2}% 100%
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.3rem',
                  color: '#111827'
                }}>
                  {totalProductos}
                </div>
              </div>

              {/* 📋 LEYENDA EN COLUMNA ALINEADA */}
              <div style={legendContainer}>
                <p style={legendItemStyle}>
                  <span style={{ color: '#dc2626', marginRight: '8px' }}>●</span>
                  Crítico: <strong>{critico}</strong> <span style={percentageStyle}>({p1.toFixed(1)}%)</span>
                </p>
                <p style={legendItemStyle}>
                  <span style={{ color: '#2563eb', marginRight: '8px' }}>●</span>
                  Sobrestock: <strong>{sobrestock}</strong> <span style={percentageStyle}>({p2.toFixed(1)}%)</span>
                </p>
                <p style={legendItemStyle}>
                  <span style={{ color: '#16a34a', marginRight: '8px' }}>●</span>
                  Óptimo: <strong>{optimo}</strong> <span style={percentageStyle}>({p3.toFixed(1)}%)</span>
                </p>
              </div>
            </div>
          )
        })()}
      </div>

      {/* 🏆 PRODUCTO DESTACADO */}
      {productoMasCaro && (
        <div style={boxStyle}>
          <h3 style={sectionTitleStyle}>🏆 Producto más costoso</h3>
          <p style={{ margin: 0, fontSize: '1rem', color: '#374151' }}>
            {productoMasCaro.nombre} — <strong style={{ color: '#111827' }}>${productoMasCaro.precio.toLocaleString()}</strong>
          </p>
        </div>
      )}

      {/* 📋 LISTADO DE RESULTADOS TOTALMENTE LIMPIO */}
      <div style={boxStyle}>
        <h3 style={sectionTitleStyle}>📋 Resultados</h3>

        {productosFiltrados.length === 0 ? (
          <p style={{ color: '#dc2626', fontStyle: 'italic', padding: '10px 0' }}>
            Producto no existente
          </p>
        ) : (
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {productosFiltrados.slice(0, 6).map(p => (
              <li key={p.id} style={itemStyle}>
                <div>
                  <strong style={{ color: '#111827' }}>{p.nombre}</strong>
                  <span style={{ color: '#6b7280', fontSize: '0.8rem', display: 'block' }}>ID: #{p.id}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#374151' }}>Stock: <strong>{p.stock}</strong></span>
                  {p.stock <= 5 && <span style={tagRed}>Crítico</span>}
                  {p.stock >= 150 && <span style={tagBlue}>Alto</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

/* 🎨 LOS SECRETOS DE LA ORGANIZACIÓN (Mismos colores claros tuyos) */

const pageStyle = {
  fontFamily: "'Segoe UI', Roboto, sans-serif",
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
}

const mainTitleStyle = {
  fontSize: '2rem',
  color: '#111827',
  margin: '0 0 5px 0'
}

const subtitleStyle = {
  fontSize: '1rem',
  color: '#374151',
  margin: 0,
  fontWeight: '400'
}

const inputStyle = {
  padding: '12px 15px',
  width: '100%',
  margin: '15px 0 25px 0',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
}

/* El Grid hace que las tarjetas midan exactamente lo mismo y se acomoden solas */
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '15px',
  margin: '20px 0'
}

const cardStyle = {
  background: '#ffffff',
  padding: '20px 15px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
  border: '1px solid #f3f4f6',
  textAlign: 'center'
}

const cardTitleStyle = {
  margin: 0,
  color: '#6b7280',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const numberStyle = {
  fontSize: '1.7rem',
  fontWeight: 'bold',
  margin: '10px 0 0 0',
  color: '#111827'
}

const chartBox = {
  background: '#ffffff',
  padding: '25px',
  borderRadius: '12px',
  marginTop: '20px',
  marginBottom: '20px',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  border: '1px solid #f3f4f6'
}

const sectionTitleStyle = {
  fontSize: '1.1rem',
  color: '#111827',
  margin: '0 0 20px 0',
  borderBottom: '1px solid #f3f4f6',
  paddingBottom: '10px'
}

/* Coloca la dona al lado izquierdo y los textos al derecho simétricamente */
const chartFlexContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: '20px'
}

const legendContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  minWidth: '180px'
}

const legendItemStyle = {
  margin: 0,
  fontSize: '0.95rem',
  color: '#374151'
}

const percentageStyle = {
  color: '#6b7280',
  fontSize: '0.85rem'
}

const alertRed = {
  background: '#fee2e2',
  color: '#991b1b',
  padding: '12px 16px',
  borderRadius: '8px',
  margin: '12px 0',
  fontSize: '0.95rem'
}

const alertBlue = {
  background: '#dbeafe',
  color: '#1e40af',
  padding: '12px 16px',
  borderRadius: '8px',
  margin: '12px 0',
  fontSize: '0.95rem'
}

const boxStyle = {
  background: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  marginBottom: '20px',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  border: '1px solid #f3f4f6'
}

/* Convierte las listas aburridas en filas de caja limpia con espacio entre ellas */
const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 15px',
  marginBottom: '8px',
  background: '#f9fafb',
  borderRadius: '8px',
  border: '1px solid #f3f4f6'
}

const tagRed = {
  color: '#fff',
  background: '#dc2626',
  padding: '3px 8px',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 'bold'
}

const tagBlue = {
  color: '#fff',
  background: '#2563eb',
  padding: '3px 8px',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 'bold'
}

export default Home