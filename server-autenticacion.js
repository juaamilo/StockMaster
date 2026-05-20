/**
 * Backend Server - Stock Master
 * Ejemplo de servidor Node.js + Express con JWT
 * 
 * Para usar:
 * 1. npm install express jsonwebtoken bcrypt cors dotenv
 * 2. Crear archivo .env con JWT_SECRET
 * 3. node server-autenticacion.js
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // URL de tu cliente React
  credentials: true
}));

// Configuración
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_2026';
const PORT = process.env.PORT || 3001;

// Base de datos simulada (en producción usar una base de datos real)
let personas = [
  {
    id: 1,
    nombre: "Juan Pérez",
    usuario: "juan123",
    contrasena: "$2b$10$YIjlrTVezQxwChFB2/N5/.WM7PSxLcOwGn3plVHXvV7Jz1CywfXDa", // hash de "password123"
    id_tipo: 1,
    direccion: "Calle Principal 123"
  },
  {
    id: 2,
    nombre: "María García",
    usuario: "maria456",
    contrasena: "$2b$10$Ku7.x4xW2WJhj8V8Q5Q5Pu0jXC.YzH9Q6F7K8L9M0N1O2P3Q4R5S", // hash de "securepass456"
    id_tipo: 2,
    direccion: "Avenida Central 456"
  },
  {
    id: 3,
    nombre: "Carlos López",
    usuario: "carlos789",
    contrasena: "$2b$10$Z3Y2X1W0V9U8T7S6R5Q4P3O2N1M0L9K8J7I6H5G4F3E2D1C0B", // hash de "admin123"
    id_tipo: 3,
    direccion: "Carrera 10 #789"
  }
];

// ────────────────────────────────────────────────────────────────
// MIDDLEWARES
// ────────────────────────────────────────────────────────────────

/**
 * Middleware para verificar JWT
 */
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuarioId = decoded.id;
    req.usuarioData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

// ────────────────────────────────────────────────────────────────
// ENDPOINTS
// ────────────────────────────────────────────────────────────────

/**
 * POST /registro
 * Registra un nuevo usuario en el sistema
 */
app.post('/registro', async (req, res) => {
  try {
    const { nombre, usuario, contrasena, id_tipo, direccion } = req.body;

    // Validaciones
    if (!nombre || !usuario || !contrasena || !id_tipo || !direccion) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    // Validar longitud de usuario
    if (usuario.length < 4) {
      return res.status(400).json({
        success: false,
        message: 'El usuario debe tener al menos 4 caracteres'
      });
    }

    // Validar longitud de contraseña
    if (contrasena.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Verificar si el usuario ya existe
    if (personas.some(p => p.usuario === usuario)) {
      return res.status(409).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Hash de la contraseña
    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: Math.max(...personas.map(p => p.id), 0) + 1,
      nombre,
      usuario,
      contrasena: contrasenaHasheada,
      id_tipo: Number(id_tipo),
      direccion
    };

    personas.push(nuevoUsuario);

    // Generar JWT
    const token = jwt.sign(
      {
        id: nuevoUsuario.id,
        usuario: nuevoUsuario.usuario,
        nombre: nuevoUsuario.nombre
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Responder sin enviar la contraseña
    const { contrasena: _, ...usuarioSinContrasena } = nuevoUsuario;

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      usuario: usuarioSinContrasena
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar usuario'
    });
  }
});

/**
 * POST /personas
 * Alias del endpoint de registro (compatible con FormularioRegistro)
 */
app.post('/personas', async (req, res) => {
  return app._router.stack.find(layer => layer.route && layer.route.path === '/registro')
    ?.route.stack[0].handle(req, res);
});

/**
 * POST /login
 * Inicia sesión de un usuario existente
 */
app.post('/login', async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validaciones
    if (!usuario || !contrasena) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña requeridos'
      });
    }

    // Buscar usuario
    const usuarioEncontrado = personas.find(p => p.usuario === usuario);

    if (!usuarioEncontrado) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
      });
    }

    // Verificar contraseña
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena
    );

    if (!contrasenaValida) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
      });
    }

    // Generar JWT
    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        usuario: usuarioEncontrado.usuario,
        nombre: usuarioEncontrado.nombre
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Responder sin enviar la contraseña
    const { contrasena: _, ...usuarioSinContrasena } = usuarioEncontrado;

    return res.json({
      success: true,
      message: 'Login exitoso',
      token,
      usuario: usuarioSinContrasena
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el login'
    });
  }
});

/**
 * GET /usuario-actual
 * Obtiene la información del usuario actualmente autenticado (protegido)
 */
app.get('/usuario-actual', verificarToken, (req, res) => {
  try {
    const usuario = personas.find(p => p.id === req.usuarioId);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const { contrasena: _, ...usuarioSinContrasena } = usuario;

    return res.json({
      success: true,
      usuario: usuarioSinContrasena
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener usuario actual'
    });
  }
});

/**
 * GET /personas
 * Obtiene lista de todas las personas
 */
app.get('/personas', (req, res) => {
  try {
    // No incluir contraseñas en la respuesta
    const personasSinContrasena = personas.map(p => {
      const { contrasena: _, ...usuario } = p;
      return usuario;
    });

    return res.json(personasSinContrasena);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener personas'
    });
  }
});

/**
 * GET /personas/:id
 * Obtiene una persona específica por ID
 */
app.get('/personas/:id', (req, res) => {
  try {
    const persona = personas.find(p => p.id === Number(req.params.id));

    if (!persona) {
      return res.status(404).json({
        success: false,
        message: 'Persona no encontrada'
      });
    }

    const { contrasena: _, ...personaSinContrasena } = persona;

    return res.json(personaSinContrasena);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener persona'
    });
  }
});

/**
 * PUT /personas/:id
 * Actualiza una persona (requiere autenticación)
 */
app.put('/personas/:id', verificarToken, async (req, res) => {
  try {
    const personaId = Number(req.params.id);
    const personaIndex = personas.findIndex(p => p.id === personaId);

    if (personaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Persona no encontrada'
      });
    }

    const { nombre, direccion, id_tipo } = req.body;
    const persona = personas[personaIndex];

    // Solo el mismo usuario o admin puede actualizar
    if (req.usuarioId !== personaId && persona.id_tipo !== 3) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar este usuario'
      });
    }

    // Actualizar solo los campos permitidos
    if (nombre) persona.nombre = nombre;
    if (direccion) persona.direccion = direccion;

    personas[personaIndex] = persona;

    const { contrasena: _, ...personaSinContrasena } = persona;

    return res.json({
      success: true,
      message: 'Persona actualizada correctamente',
      usuario: personaSinContrasena
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar persona'
    });
  }
});

/**
 * DELETE /personas/:id
 * Elimina una persona (solo admin)
 */
app.delete('/personas/:id', verificarToken, (req, res) => {
  try {
    const personaId = Number(req.params.id);
    const usuarioActual = personas.find(p => p.id === req.usuarioId);

    // Solo admin puede eliminar
    if (usuarioActual.id_tipo !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Solo administradores pueden eliminar usuarios'
      });
    }

    const personaIndex = personas.findIndex(p => p.id === personaId);

    if (personaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Persona no encontrada'
      });
    }

    personas.splice(personaIndex, 1);

    return res.json({
      success: true,
      message: 'Persona eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar persona'
    });
  }
});

/**
 * GET /verificar-token
 * Verifica si el token es válido
 */
app.get('/verificar-token', verificarToken, (req, res) => {
  return res.json({
    success: true,
    message: 'Token válido'
  });
});

// ────────────────────────────────────────────────────────────────
// ERROR HANDLING
// ────────────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error('Error:', err);
  return res.status(500).json({
    success: false,
    message: 'Error del servidor'
  });
});

// ────────────────────────────────────────────────────────────────
// INICIAR SERVIDOR
// ────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   Stock Master - Backend Server        ║
  ║   Puerto: ${PORT}                         ║
  ║   JWT Secret: ${JWT_SECRET.substring(0, 10)}...      ║
  ╚════════════════════════════════════════╝
  `);
  console.log('\n📋 Endpoints disponibles:');
  console.log('   POST   /login              - Iniciar sesión');
  console.log('   POST   /registro           - Registrar nuevo usuario');
  console.log('   POST   /personas           - Alias de /registro');
  console.log('   GET    /personas           - Listar todas las personas');
  console.log('   GET    /personas/:id       - Obtener persona específica');
  console.log('   GET    /usuario-actual     - Obtener usuario autenticado (protegido)');
  console.log('   PUT    /personas/:id       - Actualizar persona (protegido)');
  console.log('   DELETE /personas/:id       - Eliminar persona (solo admin)');
  console.log('   GET    /verificar-token    - Verificar token válido (protegido)');
  console.log('\n🔐 Credenciales de prueba:');
  console.log('   Usuario: juan123 | Contraseña: password123');
  console.log('   Usuario: maria456 | Contraseña: securepass456');
  console.log('   Usuario: carlos789 | Contraseña: admin123\n');
});

module.exports = app;
