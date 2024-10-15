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
    // Si el usuario no está autenticado y la página ha terminado de cargar, redirigir a la página de login
    if (!loading && !user) {
      navigate('/Login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <p>Cargando...</p>; // Puedes mostrar un spinner o algún tipo de indicador de carga
  }

  if (!user) {
    return null; // Mientras redirige o si no hay usuario, no muestra nada
  }

  return (
    <div className='account-manage__container'>
      <div className='account-manage-title__container'>
        <h1 className='account-title'>Gestionar Cuenta</h1>
      </div>
      <AccountDetails />
      <OrderHistory />
    </div>
  );
};

export default AccountManage;
