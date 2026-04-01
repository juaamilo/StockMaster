// ═══════════════════════════════════════════════════════════════
// LÍNEA 1: Importamos React y el hook useState
// ═══════════════════════════════════════════════════════════════
// - React: La librería base para crear componentes
// - useState: Un "hook" que nos permite tener variables que, 
//   cuando cambian, hacen que la pantalla se actualice automáticamente
import React, { useState } from 'react'

// ═══════════════════════════════════════════════════════════════
// LÍNEA 2: Importamos el componente TarjetaProducto
// ═══════════════════════════════════════════════════════════════
// - '../componentes/' significa: "sube una carpeta y entra a 'componentes'"
// - TarjetaProducto: El componente que muestra cada producto individual
import TarjetaProducto from '../componentes/TarjetaProducto'

// ═══════════════════════════════════════════════════════════════
// LÍNEA 3: Creamos el componente Inventario
// ═══════════════════════════════════════════════════════════════
// - 'const Inventario': Declaramos una función llamada Inventario
// - '{ listaProductos }': Recibimos una PROP (propiedad) llamada listaProductos
//   Esto es como una "caja" que llega desde App.jsx con todos los productos
const Inventario = ({ listaProductos }) => {

  // ═══════════════════════════════════════════════════════════
  // LÍNEA 4: Creamos un estado para la búsqueda
  // ═══════════════════════════════════════════════════════════
  // - useState(''): Creamos un estado que empieza vacío ('')
  // - terminoBusqueda: Es la variable que guarda lo que el usuario escribe
  // - setTerminoBusqueda: Es la función para actualizar terminoBusqueda
  // EJEMPLO: Si el usuario escribe "LED", terminoBusqueda = "LED"
  const [terminoBusqueda, setTerminoBusqueda] = useState('')

  // ═══════════════════════════════════════════════════════════
  // LÍNEA 5-6: Filtramos los productos según la búsqueda
  // ═══════════════════════════════════════════════════════════
  // - filter(): Crea una NUEVA lista con solo los elementos que cumplan la condición
  // - producto.nombre.toLowerCase(): Convierte el nombre del producto a minúsculas
  // - terminoBusqueda.toLowerCase(): Convierte lo que escribió el usuario a minúsculas
  // - includes(): Verifica si el nombre CONTIENE el texto buscado
  // EJEMPLO: Si busco "led", encuentra "Tira LED" (no importa mayúsculas/minúsculas)
  const productosFiltrados = listaProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  )

  // ═══════════════════════════════════════════════════════════
  // LÍNEA 7: Retornamos el JSX (lo que se va a mostrar en pantalla)
  // ═══════════════════════════════════════════════════════════
  return (
    // ═════════════════════════════════════════════════════════
    // LÍNEA 8: Div contenedor principal de toda la página
    // ═════════════════════════════════════════════════════════
    // - className="page-container": Clase CSS para estilos generales
    <div className="page-container">
      
      {/* ═══════════════════════════════════════════════════════
          LÍNEA 9: Título principal de la página
          ═══════════════════════════════════════════════════════ */}
      <h1>📦 Inventario</h1>
      
      {/* ═══════════════════════════════════════════════════════
          LÍNEA 10: Sección que agrupa todo el contenido
          ═══════════════════════════════════════════════════════ */}
      <section>
        
        {/* ═══════════════════════════════════════════════════
            LÍNEAS 11-18: Subtítulo con estilos inline
            ═══════════════════════════════════════════════════ */}
        <h2 style={{ 
          borderBottom: '3px solid #3b82f6',   // Línea azul abajo
          paddingBottom: '12px',                // Espacio interno abajo
          color: '#1f2937',                     // Color del texto (gris oscuro)
          marginBottom: '25px',                 // Espacio debajo del título
          fontSize: '1.8rem'                    // Tamaño de fuente grande
        }}>
          Listado de Inventario
        </h2>

        {/* ═══════════════════════════════════════════════════
            LÍNEAS 19-25: Contenedor del input de búsqueda
            ═══════════════════════════════════════════════════ */}
        <div style={{
          marginBottom: '25px',      // Espacio debajo de la barra
          position: 'relative',      // Para posicionar la lupa absolutamente
          maxWidth: '500px'          // Ancho máximo de 500 píxeles
        }}>
          
          {/* ═══════════════════════════════════════════════
              LÍNEAS 26-39: Ícono de lupa (SVG)
              ═══════════════════════════════════════════════ */}
          <svg 
            style={{
              position: 'absolute',          // Posición absoluta dentro del div
              left: '15px',                  // 15px desde la izquierda
              top: '50%',                    // Centrado verticalmente
              transform: 'translateY(-50%)', // Ajuste fino para centrar
              width: '20px',                 // Ancho del ícono
              height: '20px',                // Alto del ícono
              color: '#6b7280'               // Color gris
            }}
            fill="none"                      // Sin relleno
            stroke="currentColor"            // Borde con el color actual
            viewBox="0 0 24 24"              // Vista del SVG (coordenadas)
          >
            {/* LÍNEAS 40-43: Dibujo de la lupa */}
            <path 
              strokeLinecap="round"          // Bordes redondeados
              strokeLinejoin="round"         // Uniones redondeadas
              strokeWidth={2}                // Grosor de la línea: 2px
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" // Forma de la lupa
            />
          </svg>

          {/* ═══════════════════════════════════════════════
              LÍNEAS 44-58: Input de texto para buscar
              ═══════════════════════════════════════════════ */}
          <input
            type="text"                                    // Tipo: campo de texto
            placeholder="Buscar producto por nombre..."    // Texto de ayuda
            value={terminoBusqueda}                        // Valor = lo que está en el estado
            onChange={(e) => setTerminoBusqueda(e.target.value)}  // Cuando escribe, actualiza el estado
            style={{
              width: '100%',                     // Ancho completo del contenedor
              padding: '12px 15px 12px 50px',    // Espacio interno (izquierda: 50px para la lupa)
              fontSize: '1rem',                  // Tamaño de fuente
              border: '2px solid #e5e7eb',       // Borde gris claro
              borderRadius: '8px',               // Bordes redondeados
              outline: 'none'                    // Sin borde azul por defecto al hacer foco
            }}
            // Cuando el input recibe foco (clic), borde azul
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            // Cuando pierde el foco, vuelve al gris
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* ═══════════════════════════════════════════════
            LÍNEAS 59-60: Lista desordenada (sin viñetas)
            ═══════════════════════════════════════════════ */}
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          
          {/* ═══════════════════════════════════════════
              LÍNEAS 61-68: CONDICIONAL - ¿Hay productos?
              ═══════════════════════════════════════════ */}
          {productosFiltrados.length > 0 ? (
            // ═══════════════════════════════════════
            // SI HAY productos (length > 0)
            // ═══════════════════════════════════════
            // - map(): Recorre cada producto y crea un componente TarjetaProducto
            // - producto.id: Clave única para que React identifique cada elemento
            productosFiltrados.map((producto) => (
              <TarjetaProducto 
                key={producto.id}
                producto={producto}
              />
            ))
          ) : (
            // ═══════════════════════════════════════
            // SI NO HAY productos (length = 0)
            // ═══════════════════════════════════════
            // Mostramos un mensaje de "no encontrado"
            <li style={{
              textAlign: 'center',         // Texto centrado
              padding: '40px',             // Espacio interno grande
              color: '#6b7280',            // Color gris
              fontSize: '1.1rem',          // Tamaño de fuente
              background: '#f9fafb',       // Fondo gris claro
              borderRadius: '10px',        // Bordes redondeados
              border: '2px dashed #e5e7eb' // Borde punteado
            }}>
              🔍 Producto no encontrado
              <br />
              <small style={{ display: 'block', marginTop: '10px', color: '#9ca3af' }}>
                Intenta con otro nombre
              </small>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// LÍNEA 69: Exportamos el componente
// ═══════════════════════════════════════════════════════════════
// - export default: Permite importar este componente en otros archivos
// - App.jsx lo importa y lo usa en las rutas
export default Inventario