import React, { useEffect } from 'react';
import './AccountManage.css';
import AccountDetails from '../../componentes/AccountDetails/AccountDetails';
import OrderHistory from '../../componentes/OrderHistory/OrderHistory';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountManage = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Verificando estado de usuario en AccountManage:', { user, loading }); // Verifica el estado del usuario
        if (!loading && !user) {
            console.log('No hay usuario, redirigiendo a Login'); // Mensaje antes de redirigir
            navigate('/Login');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!user) {
        return <p>Redirigiendo a la página de inicio de sesión...</p>; // Mensaje amigable mientras redirige
    }

    return (
        <div className='account-manage__container'>
            <div className='account-manage-title__container'>
                <h1 className='account-title'>Gestionar Cuenta</h1>
            </div>
            <AccountDetails user={user} />
            <OrderHistory userId={user.ID_Usuarios} />
        </div>
    );
};

export default AccountManage;
