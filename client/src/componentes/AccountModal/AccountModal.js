import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext'; 
import { toast } from 'react-toastify'; // Importa toast para las notificaciones
import './AccountModal.css';

const AccountModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user } = useAuth(); 

    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        console.log('Cerrando sesión desde el modal');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onClose();
        toast.info('Has cerrado sesión con éxito.', {
            autoClose: 1000, // Duración de la alerta en milisegundos (1 segundo)
            hideProgressBar: true
        });
        navigate('/Login');
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
                            <button className="logout-button" onClick={handleLogout}>
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
