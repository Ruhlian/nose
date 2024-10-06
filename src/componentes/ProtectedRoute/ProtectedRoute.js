import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Agregar logs para verificar valores
    console.log('User:', user);
    console.log('User Role:', user?.rol);
    console.log('Allowed Roles:', allowedRoles);

    if (loading) {
        // Opcional: Mostrar un spinner de carga o similar
        return <div>Loading...</div>;
    }

    if (!user) {
        // Si no hay usuario autenticado, redirige a la página de inicio de sesión
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        // Si el rol del usuario no está en la lista de roles permitidos, redirige a una página de acceso denegado
        return <Navigate to="/access-denied" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
