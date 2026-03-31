import React from 'react'
import FormularioProducto from '../componentes/FormularioProducto'

const NuevoProducto = ({ onAgregarProducto }) => {
  return (
    <div className="page-container">
      <h1>➕ Nuevo Producto</h1>
      <FormularioProducto onAgregarProducto={onAgregarProducto} />
    </div>
  )
}

export default NuevoProducto