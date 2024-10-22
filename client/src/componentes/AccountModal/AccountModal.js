import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext'; 
import { toast } from 'react-toastify'; 
import './AccountModal.css';

const AccountModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth(); // Usa handleLogout del contexto

    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogoutClick = () => {
        console.log('Cerrando sesión desde el modal');
        handleLogout(); // Llama a la función de logout del contexto
        onClose(); // Cierra el modal
        // La redirección se maneja dentro de handleLogout
    };

    const handleManageAccount = () => {
        onClose();
        navigate('/AccountManage');
    };

    return (
        <div className={`account-modal ${isOpen ? 'show' : ''}`}>
            <div className="account-modal__content">
                {isAuthenticated ? (
                    <>
                        <h2 className="welcome-account">Bienvenido, {user?.nombre || 'Usuario'}</h2>
                        <p className="account-mail">{user?.correo_usuarios || 'No disponible'}</p>
                        <div className="account-management">
                            <div className="management">Gestión de cuenta</div>
                            <button className="manage-button" onClick={handleManageAccount}>
                                Ir a Gestionar Cuenta
                            </button>
                            <button className="logout-button" onClick={handleLogoutClick}>
                                Cerrar sesión
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="login-prompt">Inicie sesión para acceder a su cuenta</h2>
                        <button className="login-button" onClick={() => {
                            onClose();
                            navigate('/Login');
                        }}>
                            Iniciar sesión
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountModal;
