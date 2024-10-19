import React, { useState } from 'react';
import './AccountDetail.css';

const AccountDetails = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='account-details'>
            <h2>Detalles de la Cuenta</h2>
            <button onClick={handleOpenModal}>Ver Detalles</button>

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={handleCloseModal}>&times;</span>
                        <h3>Detalles del Usuario</h3>
                        <p>Nombre: {user?.Nombre || 'No disponible'}</p>
                        <p>Apellido: {user?.Apellido || 'No disponible'}</p>
                        <p>Correo: {user?.correo_usuarios || 'No disponible'}</p>
                        {/* Agrega más detalles según lo necesites */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;
