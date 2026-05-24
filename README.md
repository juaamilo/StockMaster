# 📦 StockMaster - Sistema de Gestión de Inventario

Un sistema moderno de gestión de inventario desarrollado con React y Vite, con autenticación segura mediante JWT y una interfaz intuitiva para administrar productos y usuarios.

---

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- ✅ Registro de usuarios con validación de datos
- ✅ Login con token JWT
- ✅ Gestión de sesión (almacenamiento en localStorage)
- ✅ Rutas protegidas - acceso limitado a usuarios autenticados
- ✅ Navbar dinámico que muestra usuario y botón de logout

### 📊 Gestión de Inventario
- ✅ Visualización de productos en tiempo real
- ✅ Creación de nuevos productos
- ✅ Actualización de detalles de productos
- ✅ Interfaz responsiva y moderna

### 🛡️ Seguridad
- ✅ Autenticación con JWT (JSON Web Token)
- ✅ Hashing de contraseñas con bcrypt
- ✅ Tokens con expiración de 24 horas
- ✅ CORS configurado para seguridad

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 16+ instalado
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd StockMaster
```

2. **Instalar dependencias del frontend**
```bash
npm install
```

3. **Instalar dependencias del backend** (opcional)
```bash
npm install express jsonwebtoken bcrypt cors dotenv
```

### Ejecutar la Aplicación

#### Opción 1: Desarrollo Local (Recomendado)

**Frontend:**
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

**Backend (en otra terminal):**
```bash
node server-autenticacion.js
```
El servidor estará disponible en `http://localhost:3001`

#### Opción 2: Usar JSON Server (sin autenticación real)
```bash
npm run api
```
JSON Server correrá en `http://localhost:3000`

### Compilar para Producción
```bash
npm run build
```

---

## 📁 Estructura del Proyecto

```
StockMaster/
├── src/
│   ├── componentes/
│   │   ├── FormularioLogin.jsx       # Formulario de inicio de sesión
│   │   ├── FormularioRegistro.jsx    # Formulario de registro
│   │   ├── FormularioProducto.jsx    # Formulario de productos
│   │   ├── TarjetaProducto.jsx       # Componente de producto
│   │   └── Navbar.jsx                # Barra de navegación
│   ├── paginas/
│   │   ├── PaginaLogin.jsx           # Página de login
│   │   ├── PaginaRegistro.jsx        # Página de registro
│   │   ├── Home.jsx                  # Página principal
│   │   ├── Inventario.jsx            # Página de inventario
│   │   ├── DetalleProducto.jsx       # Detalle de producto
│   │   ├── EditarProducto.jsx        # Edición de producto
│   │   └── NuevoProducto.jsx         # Crear producto
│   ├── servicios/
│   │   ├── servicioAutenticacion.js  # Funciones de autenticación
│   │   └── README_AUTENTICACION.md   # Documentación de autenticación
│   ├── Datos/
│   │   └── datosInventario.js        # Datos de ejemplo
│   ├── App.jsx                       # Componente raíz
│   ├── main.jsx                      # Punto de entrada
│   ├── App.css                       # Estilos globales
│   └── index.css                     # Estilos base
├── public/                           # Arquivos estáticos
├── dbo.json                          # Base de datos JSON
├── server-autenticacion.js           # Servidor Express con JWT
├── package.json                      # Dependencias del proyecto
├── vite.config.js                    # Configuración de Vite
├── eslint.config.js                  # Configuración de ESLint
├── AUTENTICACION_SETUP.md            # Guía de autenticación
└── README.md                         # Este archivo
```

---

## 🔐 Sistema de Autenticación

### Funciones Disponibles

El servicio de autenticación (`servicioAutenticacion.js`) proporciona:

- `registrarse(datos)` - Registra un nuevo usuario
- `login(usuario, contrasena)` - Inicia sesión
- `logout()` - Cierra la sesión
- `obtenerUsuarioActual()` - Obtiene el usuario actual
- `obtenerToken()` - Obtiene el JWT
- `estaAutenticado()` - Verifica si está autenticado
- `peticionConAutenticacion(url, opciones)` - Realiza peticiones con token

### Modelo de Datos - Usuario

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "usuario": "juan123",
  "contrasena": "password123",
  "id_tipo": 1,
  "direccion": "Calle Principal 123"
}
```

### Tipos de Usuario

| ID | Tipo | Descripción |
|----|------|-------------|
| 1 | Cliente | Usuario estándar |
| 2 | Vendedor | Usuario con permisos de venta |
| 3 | Administrador | Acceso completo al sistema |

### Credenciales de Prueba

| Usuario | Contraseña | Tipo |
|---------|-----------|------|
| juan123 | password123 | Cliente |
| maria456 | securepass456 | Vendedor |
| carlos789 | admin123 | Administrador |

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Librería de UI
- **Vite 8** - Build tool y dev server
- **React Router DOM 7** - Enrutamiento
- **CSS3** - Estilos

### Backend
- **Express.js** - Framework web
- **JWT** - Autenticación
- **bcrypt** - Hashing de contraseñas
- **CORS** - Control de acceso
- **dotenv** - Variables de entorno

### Herramientas
- **ESLint** - Linting
- **JSON Server** - API mock (opcional)
- **npm** - Gestor de paquetes

---

## 📋 Endpoints de API

### Autenticación

**POST /login**
```json
{
  "usuario": "juan123",
  "contrasena": "password123"
}
```
Respuesta: `{ "token": "...", "usuario": {...} }`

**POST /personas** (Registro)
```json
{
  "nombre": "Juan Pérez",
  "usuario": "juan123",
  "contrasena": "password123",
  "id_tipo": 1,
  "direccion": "Calle Principal 123"
}
```

**GET /personas** - Obtener todos los usuarios (requiere autenticación)

---

## 🔨 Scripts Disponibles

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Pre-visualizar build de producción
npm run lint       # Ejecutar ESLint
npm run api        # Iniciar JSON Server
```

---

## 📝 Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3001
JWT_SECRET=tu_clave_secreta_super_segura_2026
PORT=3001
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 📞 Soporte

Para preguntas o problemas, abre un issue en el repositorio o contacta al equipo de desarrollo.

---

**Última actualización:** Mayo 2026
