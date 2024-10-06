import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext/AuthContext';
import './AccountDetail.css';

const AccountDetails = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({ nombre: '', apellido: '', correo: '' });
  const [password, setPassword] = useState(''); // Para almacenar la contraseña
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // Para verificar si la contraseña es correcta

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`http://localhost:3001/usuarios/${user.id}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error al obtener detalles del usuario:', error);
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const verifyPassword = () => {
    if (user.password === password) {
      setIsPasswordVerified(true);
      alert('Contraseña verificada correctamente');
    } else {
      alert('Contraseña incorrecta');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordVerified) {
      alert('Debes verificar tu contraseña antes de actualizar los datos');
      return;
    }

    if (user && user.id) {
      try {
        await axios.put(`http://localhost:3001/usuarios/${user.id}`, userData);
        alert('Datos actualizados con éxito');
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        alert('Hubo un error al actualizar los datos. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className='account-details__container'>
      {!isPasswordVerified ? (
        <div>
          <h2>Verificación de Contraseña</h2>
          <label>
            Introduce tu contraseña para realizar cambios:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button onClick={verifyPassword}>Verificar Contraseña</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={userData.apellido}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={userData.correo}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default AccountDetails;
