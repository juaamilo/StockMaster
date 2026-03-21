//en esta parte vemos el front para react y como se va a mostrar cada producto en el inventario, con su nombre, categoria, stock y precio   
function TarjetaProducto({ producto }) {
  const formatoPrecio = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});
  return (
    <li style={{ 
      background: '#ffffff', 
      margin: '10px 0', 
      padding: '20px', 
      borderRadius: '8px',
      borderLeft: '6px solid #2563eb', // Borde azul a la izquierda
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Sombra suave
      fontFamily: 'Arial, sans-serif',
      listStyle: 'none' // Quita el punto de la lista por seguridad
    }}>
      
      {/* Fila Superior: Nombre y Categoría */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1.2rem' }}>
          {producto.nombre}
        </h3>
        
        {/* Etiqueta de Categoría */}
        <span style={{ 
          background: '#e0e7ff', 
          color: '#3730a3',
          padding: '4px 10px', 
          borderRadius: '20px', 
          fontSize: '0.85rem',
          fontWeight: 'bold'
        }}>
          {producto.categoria}
        </span>
      </div>
      
      {/* Fila Inferior: Stock y Precio */}
  <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid #f3f4f6', paddingTop: '15px', flexWrap: 'wrap' }}>
        
        {/* Bloque de Stock */}
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px' }}>
            Stock Disponible
          </span>
          <strong style={{ 
            fontSize: '1.2rem', 
            color: producto.stock < 10 ? '#dc2626' : '#059669' // Rojo si es poco, verde si hay mucho
          }}>
            {producto.stock} 
          </strong>
          {producto.stock < 10 && (
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#dc2626', marginTop: '2px' }}>
              ¡Reponer pronto!
            </span>
          )}
        </div>

        {/* Bloque de Precio */}
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px' }}>
            Precio Unitario
          </span>
          <strong style={{ fontSize: '1.2rem', color: '#1f2937' }}> ${producto.precio.toFixed(3)}
          </strong>
        </div>
      </div>
    </li>
  );
}

export default TarjetaProducto;