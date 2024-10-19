import React from 'react';
import { useAuth } from '../../../context/AuthContext/AuthContext';

const UserModal = () => {
    const { user } = useAuth();

    return (
        <div className="modal">
            <h2>Bienvenido, {user ? user.nombre : 'Usuario'}</h2>
            <p>Email: {user ? user.correo_usuarios : 'No disponible'}</p>
            <p>Rol: {user ? user.rol : 'No disponible'}</p>
            {/* Aquí puedes agregar más información que desees mostrar */}
        </div>
    );
};

export default UserModal;
