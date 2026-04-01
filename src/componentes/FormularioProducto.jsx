//en esta parte vemos el formulario para agregar nuevos productos al inventario, con campos para nombre, categoría, stock y precio, y un botón para guardar el producto. El formulario se comunica con el componente padre (App.jsx) para actualizar el inventario.
import { useState } from 'react';
function FormularioProducto({ onAgregarProducto }) {
  // Estado local para guardar lo que el usuario escribe en cada campo
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: '',
    stock: '',
    precio: ''
  });

  // Función que se activa cada vez que escribes en un input
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setNuevoProducto({
      ...nuevoProducto,  // Mantiene los otros campos
      [name]: value      // Actualiza solo el campo que cambiaste
    });
  };

  // Función que se activa al enviar el formulario
  const manejarEnvio = (evento) => {
    evento.preventDefault(); // Evita que la página se recargue

    // Validar que todos los campos tengan datos
    if (!nuevoProducto.nombre || !nuevoProducto.precio) {
      alert('Por favor completa al menos el nombre y el precio');
      return;
    }

    // Crear el objeto producto con los datos del formulario
    const productoParaAgregar = {
      id: Date.now(), // Genera un ID único basado en la fecha actual
      nombre: nuevoProducto.nombre,
      categoria: nuevoProducto.categoria || 'General',
      stock: Number(nuevoProducto.stock) || 0,
      precio: Number(nuevoProducto.precio) || 0
    };

    // Enviar el producto al componente padre (App.jsx)
    onAgregarProducto(productoParaAgregar);

    // Limpiar el formulario
    setNuevoProducto({
      nombre: '',
      categoria: '',
      stock: '',
      precio: ''
    });
  };

  return (
    <div style={{
      background: '#ffffff',
      padding: '25px',
      borderRadius: '12px',
      marginBottom: '30px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '2px solid #3b82f6'
    }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#1e3a8a', fontSize: '1.5rem' }}>
        ➕ Agregar Nuevo Producto
      </h2>

      <form onSubmit={manejarEnvio}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {/* Campo Nombre */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#374151' }}>
              Nombre del Producto
            </label>
            <input
              type="text"
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={manejarCambio}
              placeholder="Ej: Tira LED RGB"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          {/* Campo Categoría */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#374151' }}>
              Categoría
            </label>
            <input
              type="text"
              name="categoria"
              value={nuevoProducto.categoria}
              onChange={manejarCambio}
              placeholder="Ej: Iluminación"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Campo Stock */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#374151' }}>
              Stock Inicial
            </label>
            <input
              type="number"
              name="stock"
              value={nuevoProducto.stock}
              onChange={manejarCambio}
              placeholder="Ej: 50"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Campo Precio */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#374151' }}>
              Precio (COP)
            </label>
            <input
              type="number"
              name="precio"
              value={nuevoProducto.precio}
              onChange={manejarCambio}
              placeholder="Ej: 85000"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
              required
            />
          </div>
        </div>

        {/* Botón de Guardar */}
        <button
          type="submit"
          style={{
            marginTop: '20px',
            background: '#2563eb',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.background = '#2563eb'}
        >
          💾 Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default FormularioProducto;