/**
 * Contexto de Autenticación (Auth Context)
 * Ubicación: src/context/AuthContext.jsx
 * Descripción: Gestiona el estado global de la sesión del usuario.
 * 
 * Propósito:
 * Centraliza la lógica de sesión para que cualquier componente pueda saber
 * si el usuario está logueado, quién es y ejecutar acciones como login/logout.
 * Elimina la necesidad de pasar props manuales de usuario a través de toda la app.
 */

import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

// Creación del contexto (se usará luego en App.jsx)
export const AuthContext = createContext(null);

/**
 * Proveedor del Contexto
 * Componente que envuelve la aplicación y provee los datos de autenticación.
 */
export const AuthProvider = ({ children }) => {
    // Estado para el usuario logueado
    const [currentUser, setCurrentUser] = useState(null);
    // Estado de carga para evitar mostrar contenido antes de verificar sesión
    const [loading, setLoading] = useState(true);

    /**
     * Verificación inicial de sesión
     * Se ejecuta al montar el componente para ver si hay datos en localStorage.
     */
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        setLoading(false);
    }, []);

    /**
     * Lógica de Login
     * Intenta autenticar con el backend y actualiza el estado global.
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {Object} Resultado de la operación
     */
    const login = async (username, password) => {
        try {
            // El servicio guarda el token en localStorage automáticamente
            await authService.login(username, password);
            
            // Recuperamos el usuario para actualizar el estado
            const user = authService.getCurrentUser();
            setCurrentUser(user);
            
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    /**
     * Lógica de Logout
     * Limpia el estado y delega la limpieza del storage al servicio.
     */
    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    // Objeto que se comparte con el resto de la app
    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Solo renderizamos hijos cuando ya terminó de verificar la sesión */}
            {!loading && children}
        </AuthContext.Provider>
    );
};