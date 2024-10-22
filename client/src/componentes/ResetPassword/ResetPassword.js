import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [contrasena, setContrasena] = useState(''); // Cambiado de nuevaContrasena a contrasena
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await AuthService.verifyToken(token);
      } catch (error) {
        toast.error('El enlace de restablecimiento de contraseña es inválido o ha expirado.');
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    console.log('Intentando restablecer la contraseña'); // Log para verificar el intento de restablecimiento

    if (contrasena !== confirmarContrasena) {
        toast.error('Las contraseñas no coinciden');
        return;
    }

    console.log('Contraseña nueva:', contrasena); // Log para verificar la contraseña nueva

    try {
        await AuthService.resetPassword(token, contrasena);
        toast.success('Contraseña restablecida con éxito');
        navigate('/login'); // Redirige a la página de login
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error); // Log para errores
        toast.error(error.message || 'Error al restablecer la contraseña');
    }
};

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const handleMouseLeave = () => {
    setShowPassword(false);
  };

  if (!isTokenValid) return <p>El enlace de restablecimiento de contraseña es inválido.</p>; // Mensaje para token inválido

  return (
    <div className="container">
      <form className="form" onSubmit={handleResetPassword}>
        <h2>Restablecer Contraseña</h2>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nueva Contraseña"
            value={contrasena} // Cambiado de nuevaContrasena a contrasena
            onChange={(e) => setContrasena(e.target.value)} // Cambiado de setNuevaContrasena a setContrasena
            required
          />
          <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirmar Contraseña"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            required
          />
          <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;
