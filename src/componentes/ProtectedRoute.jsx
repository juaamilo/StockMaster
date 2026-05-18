  /**
 * Componente de Ruta Protegida (Protected Route)
 * Ubicación: src/componentes/ProtectedRoute.jsx
 * Descripción: Wrapper (envoltorio) de seguridad para rutas privadas.
 * 
 * Funcionamiento:
 * 1. Intercepta el intento de navegación a una ruta privada (ej: Inventario).
 * 2. Consulta el contexto global (AuthContext) para verificar si hay un usuario logueado.
 * 3. Si NO hay usuario -> Redirige inmediatamente a /login.
 * 4. Si HAY usuario -> Permite renderizar el componente solicitado.
 */

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    // Obtenemos el estado del usuario actual desde el contexto
    const { currentUser } = useContext(AuthContext);

    // Lógica de protección:
    // Si currentUser es null o undefined, significa que no ha hecho login.
    // <Navigate /> redirige al usuario a la ruta de login.
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Si el usuario existe, retornamos el componente hijo (la página real)
    // que estaba intentando acceder.
    return children;
};

export default ProtectedRoute;