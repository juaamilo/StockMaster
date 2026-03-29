import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">🏠 Inicio</Link></li>
        <li><Link to="/inventario">📦 Inventario</Link></li>
        <li><Link to="/nuevo">➕ Nuevo Producto</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar