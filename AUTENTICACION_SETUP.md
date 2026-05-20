# 🔐 Sistema de Autenticación - Stock Master

## ✨ Lo que se ha implementado

### Frontend (React)
✅ **Formulario de Registro** - Captura: nombre, usuario, contraseña, tipo de persona, dirección  
✅ **Formulario de Login** - Validación de usuario y contraseña  
✅ **Servicio de Autenticación** - Funciones reutilizables para comunicarse con la API  
✅ **Gestión de sesión** - Token JWT almacenado en localStorage  
✅ **Navbar dinámico** - Muestra usuario autenticado y botón de logout  
✅ **Rutas protegidas** - Acceso a inventario requiere login  

### Backend (Ejemplo Express.js)
📝 **Archivo de servidor** incluido: `server-autenticacion.js`  
📋 **Endpoints completos** para registro, login y gestión de usuarios  
🔒 **Autenticación con JWT** - Tokens con expiración de 24h  
🛡️ **Hashing de contraseñas** - Con bcrypt  

---

## 🚀 Inicio Rápido

### 1. Frontend - Instalar dependencias
```bash
cd c:\Users\Yeffer\Documents\StockMaster
npm install
```

### 2. Frontend - Ejecutar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### 3. Backend - Configurar

#### Opción A: Usar el servidor Express incluido

**3a. Instalar dependencias del backend:**
```bash
npm install express jsonwebtoken bcrypt cors dotenv
```

**3b. Crear archivo `.env`:**
```bash
# Copiar desde .env.example o crear manualmente
JWT_SECRET=tu_clave_secreta_super_segura_2026
PORT=3001
```

**3c. Ejecutar el servidor:**
```bash
node server-autenticacion.js
```

#### Opción B: Usar JSON Server (más simple, sin autenticación real)
```bash
npm run api
```
JSON Server correrá en `http://localhost:3000`

---

## 📁 Estructura de Archivos

```
StockMaster/
├── src/
│   ├── componentes/
│   │   ├── FormularioLogin.jsx       ← Componente de login
│   │   ├── FormularioRegistro.jsx    ← Componente de registro
│   │   └── Navbar.jsx                ← Navbar actualizado
│   ├── paginas/
│   │   ├── PaginaLogin.jsx           ← Página de login
│   │   └── PaginaRegistro.jsx        ← Página de registro
│   ├── servicios/
│   │   ├── servicioAutenticacion.js  ← Funciones de autenticación
│   │   └── README_AUTENTICACION.md   ← Documentación detallada
│   └── App.jsx                       ← Actualizado con rutas de auth
├── dbo.json                          ← Base de datos con tabla de personas
├── server-autenticacion.js           ← Backend Express con JWT
├── package-backend.json              ← Dependencias del backend
├── .env.example                      ← Variables de entorno
└── README.md                         ← Este archivo
```

---

## 🔐 Credenciales de Prueba

| Usuario | Contraseña | Tipo |
|---------|-----------|------|
| juan123 | password123 | Cliente |
| maria456 | securepass456 | Vendedor |
| carlos789 | admin123 | Administrador |

---

## 📋 Flujo de Autenticación

```
┌─────────────────────────────────────────────────────────┐
│                 USUARIO NO AUTENTICADO                   │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌─────────┐            ┌────────────┐
    │ LOGIN   │            │ REGISTRO   │
    └────┬────┘            └──────┬─────┘
         │                        │
    POST /login          POST /personas (o /registro)
         │                        │
         └────────────┬───────────┘
                      │
    ┌─────────────────▼─────────────────┐
    │  Backend verifica credenciales     │
    │  Hashea contraseña (bcrypt)       │
    │  Genera JWT con expiración 24h     │
    └────────────┬─────────────────────┘
                 │
         ┌───────▼────────┐
         │  Respuesta con │
         │  JWT + Usuario │
         └───────┬────────┘
                 │
    ┌────────────▼───────────┐
    │ localStorage.setItem() │
    │ token, usuario         │
    └────────────┬───────────┘
                 │
         ┌───────▼──────────────────┐
         │ USUARIO AUTENTICADO      │
         │ Navbar muestra nombre    │
         │ Acceso a inventario      │
         └──────────┬───────────────┘
                    │
         ┌──────────┘
         │
         ▼
    ┌─────────────────────┐
    │ Cerrar Sesión       │
    │ localStorage.clear()│
    │ Redirige a inicio   │
    └─────────────────────┘
```

---

## 🔌 Endpoints disponibles

### Autenticación
- `POST /login` - Iniciar sesión
- `POST /registro` - Registrar nuevo usuario
- `POST /personas` - Alias de /registro

### Usuarios (protegidos con JWT)
- `GET /usuario-actual` - Obtener usuario autenticado
- `GET /personas` - Listar todas las personas
- `GET /personas/:id` - Obtener persona específica
- `PUT /personas/:id` - Actualizar persona
- `DELETE /personas/:id` - Eliminar persona (solo admin)

### Verificación
- `GET /verificar-token` - Verificar que el token es válido

---

## 🔍 Validaciones Implementadas

### Frontend
✅ Usuario: mínimo 4 caracteres  
✅ Contraseña: mínimo 6 caracteres  
✅ Campos requeridos: nombre, usuario, contraseña, tipo, dirección  
✅ Confirmación de contraseña en registro  
✅ Mensajes de error claros  

### Backend
✅ Usuario único (no duplicados)  
✅ Validación de contraseña hasheada  
✅ JWT con expiración  
✅ Protección de endpoints  
✅ Manejo de errores  

---

## 🛠️ Cómo usar el Servicio de Autenticación

### Registro
```javascript
import { registrarse } from './servicios/servicioAutenticacion';

const datos = {
  nombre: "Juan Pérez",
  usuario: "juan123",
  contrasena: "password123",
  id_tipo: 1,
  direccion: "Calle Principal 123"
};

try {
  const resultado = await registrarse(datos);
  console.log('Usuario registrado:', resultado.usuario);
  console.log('Token:', resultado.token);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Login
```javascript
import { login } from './servicios/servicioAutenticacion';

try {
  const resultado = await login('juan123', 'password123');
  console.log('Usuario autenticado:', resultado.usuario);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Obtener usuario actual
```javascript
import { obtenerUsuarioActual } from './servicios/servicioAutenticacion';

const usuario = obtenerUsuarioActual();
console.log('Usuario actual:', usuario);
```

### Hacer peticiones autenticadas
```javascript
import { peticionConAutenticacion } from './servicios/servicioAutenticacion';

const respuesta = await peticionConAutenticacion(
  'http://localhost:3001/usuario-actual'
);
const datos = await respuesta.json();
```

---

## 🌐 URLs de la Aplicación

- `/` - Página de inicio
- `/login` - Formulario de login
- `/registro` - Formulario de registro
- `/inventario` - Inventario de productos (requiere autenticación)
- `/nuevo` - Crear nuevo producto (requiere autenticación)
- `/producto/:codigo` - Detalle de producto
- `/editar/:codigo` - Editar producto

---

## ⚙️ Variables de Entorno

Crear archivo `.env` en la raíz del proyecto backend:

```env
JWT_SECRET=tu_clave_secreta_super_segura_aqui
PORT=3001
FRONTEND_URL=http://localhost:5173
```

---

## 🐛 Solución de Problemas

### Error: "Token no proporcionado"
- Asegúrate de estar autenticado
- El token debe incluirse en el header `Authorization: Bearer <token>`

### Error: "Usuario o contraseña incorrectos"
- Verifica las credenciales
- Ten en cuenta que es sensible a mayúsculas/minúsculas

### Error: "CORS"
- Verifica que el backend esté corriendo en puerto 3001
- Asegúrate que CORS esté habilitado

### El formulario no envía datos
- Verifica la consola del navegador para errores
- Asegúrate de que el backend esté corriendo

---

## 📚 Documentación Adicional

Para más detalles sobre:
- **Implementación del backend**: Ver `src/servicios/README_AUTENTICACION.md`
- **Ejemplo de servidor Express**: Ver `server-autenticacion.js`
- **Configuración de variables**: Ver `.env.example`

---

## 🔒 Seguridad en Producción

Antes de pasar a producción:
- ✅ Usar HTTPS en lugar de HTTP
- ✅ Guardar JWT_SECRET en variables de entorno
- ✅ Usar base de datos real (PostgreSQL, MongoDB, etc.)
- ✅ Hashear contraseñas con bcrypt
- ✅ Validar entrada del usuario en el backend
- ✅ Configurar CORS adecuadamente
- ✅ Implementar rate limiting
- ✅ Usar tokens de corta duración con refresh tokens

---

## 📞 Soporte

Si tienes preguntas o problemas:
1. Revisa la consola del navegador para errores
2. Verifica que los servidores frontend y backend estén corriendo
3. Comprueba que estés usando las credenciales correctas
4. Revisa la documentación en `src/servicios/README_AUTENTICACION.md`

---

**¡Listo! Tu sistema de autenticación está configurado y listo para usar.** 🎉
