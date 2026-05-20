# Sistema de Autenticación - Stock Master

## 📝 Descripción

Este proyecto incluye un sistema completo de autenticación con registro y login usando JWT (JSON Web Token).

## 🏗️ Estructura del Sistema

### Frontend (React)

#### 📦 Componentes creados:
- **FormularioLogin.jsx** - Componente de formulario para iniciar sesión
- **FormularioRegistro.jsx** - Componente de formulario para registrarse
- **PaginaLogin.jsx** - Página wrapper para el login
- **PaginaRegistro.jsx** - Página wrapper para el registro

#### 📁 Servicios:
- **servicioAutenticacion.js** - Funciones para comunicarse con la API:
  - `registrarse(datos)` - Registra un nuevo usuario
  - `login(usuario, contrasena)` - Inicia sesión
  - `logout()` - Cierra la sesión
  - `obtenerUsuarioActual()` - Obtiene el usuario actual
  - `obtenerToken()` - Obtiene el JWT
  - `estaAutenticado()` - Verifica si está autenticado
  - `peticionConAutenticacion()` - Realiza peticiones HTTP con token

#### 🔄 Actualizaciones:
- **App.jsx** - Agregadas rutas de login/registro y estado de autenticación
- **Navbar.jsx** - Muestra usuario autenticado y botón de logout
- **dbo.json** - Agregada tabla de personas con datos de ejemplo

## 🔐 Modelo de Datos - Persona

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

### Campos:
- **id**: Identificador único
- **nombre**: Nombre completo del usuario
- **usuario**: Nombre de usuario único (mín. 4 caracteres)
- **contrasena**: Contraseña hasheada (mín. 6 caracteres)
- **id_tipo**: Tipo de persona (1=Cliente, 2=Vendedor, 3=Administrador)
- **direccion**: Dirección del usuario

## 🚀 Endpoints de Backend Requeridos

El backend debe proporcionar estos endpoints para la autenticación:

### 1. Registro de Usuario
```
POST /personas
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "usuario": "juan123",
  "contrasena": "password123",
  "id_tipo": 1,
  "direccion": "Calle Principal 123"
}

Respuesta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "usuario": "juan123",
    "id_tipo": 1,
    "direccion": "Calle Principal 123"
  }
}
```

### 2. Login
```
POST /login
Content-Type: application/json

{
  "usuario": "juan123",
  "contrasena": "password123"
}

Respuesta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "usuario": "juan123",
    "id_tipo": 1,
    "direccion": "Calle Principal 123"
  }
}
```

### 3. Obtener Usuario Actual (Protegido)
```
GET /usuario-actual
Authorization: Bearer <token>

Respuesta:
{
  "id": 1,
  "nombre": "Juan Pérez",
  "usuario": "juan123",
  "id_tipo": 1,
  "direccion": "Calle Principal 123"
}
```

## ⚙️ Configuración del Backend (Node.js + Express)

### 1. Instalar dependencias necesarias:
```bash
npm install express jsonwebtoken bcrypt cors dotenv
```

### 2. Crear archivo `server.js` (Ejemplo):
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_aqui';

// Base de datos simulada (usar base de datos real en producción)
const personas = [
  {
    id: 1,
    nombre: "Juan Pérez",
    usuario: "juan123",
    contrasena: "$2b$10$...", // Hash de bcrypt
    id_tipo: 1,
    direccion: "Calle Principal 123"
  }
];

// Middleware para verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Endpoint de Registro
app.post('/personas', async (req, res) => {
  try {
    const { nombre, usuario, contrasena, id_tipo, direccion } = req.body;

    // Validaciones
    if (!nombre || !usuario || !contrasena || !id_tipo || !direccion) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Verificar si el usuario ya existe
    if (personas.find(p => p.usuario === usuario)) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: personas.length + 1,
      nombre,
      usuario,
      contrasena: contrasenaHasheada,
      id_tipo,
      direccion
    };

    personas.push(nuevoUsuario);

    // Generar JWT
    const token = jwt.sign(
      { id: nuevoUsuario.id, usuario: nuevoUsuario.usuario },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Responder sin enviar la contraseña
    const { contrasena: _, ...usuarioSinContrasena } = nuevoUsuario;

    res.status(201).json({
      token,
      usuario: usuarioSinContrasena
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Endpoint de Login
app.post('/login', async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
    }

    // Buscar usuario
    const usuarioEncontrado = personas.find(p => p.usuario === usuario);

    if (!usuarioEncontrado) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verificar contraseña
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena
    );

    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Responder sin enviar la contraseña
    const { contrasena: _, ...usuarioSinContrasena } = usuarioEncontrado;

    res.json({
      token,
      usuario: usuarioSinContrasena
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login' });
  }
});

// Endpoint para obtener usuario actual (protegido)
app.get('/usuario-actual', verificarToken, (req, res) => {
  const usuario = personas.find(p => p.id === req.usuarioId);

  if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const { contrasena: _, ...usuarioSinContrasena } = usuario;
  res.json(usuarioSinContrasena);
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

### 3. Archivo `.env`:
```
JWT_SECRET=tu_clave_secreta_super_segura_aqui
PORT=3001
```

## 🔗 Flujo de Autenticación

1. **Registro**:
   - Usuario completa el formulario con nombre, usuario, contraseña, tipo y dirección
   - Se envía POST a `/personas`
   - Backend valida, hashea la contraseña y crea el usuario
   - Se devuelve JWT y datos del usuario
   - JWT se guarda en localStorage

2. **Login**:
   - Usuario ingresa usuario y contraseña
   - Se envía POST a `/login`
   - Backend busca usuario y verifica contraseña
   - Se devuelve JWT si es correcto
   - JWT se guarda en localStorage

3. **Peticiones Protegidas**:
   - Se incluye el token en el header: `Authorization: Bearer <token>`
   - Backend verifica el token
   - Si es válido, procesa la solicitud
   - Si es inválido o expirado, redirige a login

4. **Logout**:
   - Se elimina el JWT de localStorage
   - Usuario es redirigido a la página de inicio

## 💾 Almacenamiento del Token

El token JWT se almacena en `localStorage`:
- **token**: El JWT para autenticación
- **usuario**: Los datos del usuario autenticado

## 🛡️ Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación de campos
- ✅ Protección de endpoints
- ✅ CORS configurado
- ⚠️ **En producción**: Usar HTTPS, variables de entorno seguros, y base de datos real

## 📱 Rutas Disponibles

- `/` - Página de inicio
- `/login` - Formulario de login
- `/registro` - Formulario de registro
- `/inventario` - Listado de productos (requiere autenticación)
- `/nuevo` - Crear nuevo producto (requiere autenticación)

## 🧪 Credenciales de Prueba

Están incluidas en el `dbo.json`:

| Usuario | Contraseña | Tipo |
|---------|-----------|------|
| juan123 | password123 | Cliente |
| maria456 | securepass456 | Vendedor |
| carlos789 | admin123 | Administrador |

## 📚 Próximos Pasos

1. Implementar el backend con los endpoints requeridos
2. Hashear contraseñas con bcrypt
3. Generar y validar JWT
4. Proteger rutas que requieran autenticación
5. Agregar recuperación de contraseña
6. Implementar roles y permisos basados en `id_tipo`
