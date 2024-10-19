import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import './Login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { validateCorreo, validateName, validateContrasena } from '../../../utils/helpers';

const Login = () => {
    const [isRegisterView, setIsRegisterView] = useState(false);
    const [correo_usuarios, setCorreoUsuarios] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contrasenaVisible, setContrasenaVisible] = useState(false);
    const { handleLogin, handleRegister } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const toggleView = () => {
        setIsRegisterView(prev => !prev);
        setErrorMessage(''); // Limpia el mensaje de error al cambiar de vista
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Validaciones
        if (!validateCorreo(correo_usuarios)) {
            setErrorMessage('Por favor, ingresa un correo electrónico válido (mínimo 8 caracteres antes del @).');
            return;
        }
        if (!validateContrasena(contrasena)) {
            setErrorMessage('La contraseña debe tener entre 10 y 25 caracteres, con letras, números y al menos un símbolo.');
            return;
        }

        try {
            await handleLogin(correo_usuarios, contrasena);
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpia el mensaje de error

        // Validaciones
        if (!validateName(name) || !validateName(lastName)) {
            setErrorMessage('El nombre y apellido solo pueden contener letras y tener como máximo 15 caracteres.');
            return;
        }
        if (!validateCorreo(correo_usuarios)) {
            setErrorMessage('Por favor, ingresa un correo electrónico válido (mínimo 8 caracteres antes del @).');
            return;
        }
        if (!validateContrasena(contrasena)) {
            setErrorMessage('La contraseña debe tener entre 10 y 25 caracteres, con letras, números y al menos un símbolo.');
            return;
        }

        try {
            await handleRegister(name, lastName, correo_usuarios, contrasena);
        } catch (error) {
            console.error('Registro fallido:', error);
            setErrorMessage('Error al registrar el usuario. Inténtalo de nuevo.');
        }
    };

    const handleContrasenaVisibility = () => {
        // Muestra la contraseña
        setContrasenaVisible(true);
        
        // Configura un temporizador para ocultarla después de 1 segundo (1000 ms)
        setTimeout(() => {
            setContrasenaVisible(false);
        }, 1000);
    };

    return (
        <main className="main">
            <div className={`contenedor__todo ${isRegisterView ? 'register-view' : ''}`}>
                <div className="caja__trasera">
                    <div className="caja__trasera_login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar_sesion" onClick={toggleView}>Iniciar sesión</button>
                    </div>
                    <div className="caja__trasera_register">
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <button id="btn__registrarse" onClick={toggleView}>Registrarse</button>
                    </div>
                </div>

                <div className="contenedor__login-register">
                    <form className={`formulario__login ${isRegisterView ? 'hidden' : ''}`} onSubmit={handleLoginSubmit}>
                        <h2>Iniciar sesión</h2>
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={correo_usuarios}
                            onChange={(e) => {
                                if (e.target.value.length <= 25) { // Limitar a 25 caracteres
                                    setCorreoUsuarios(e.target.value);
                                }
                            }}
                            required
                        />
                        <div className="password-container">
                            <input
                                type={contrasenaVisible ? 'text' : 'password'}
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => {
                                    if (e.target.value.length <= 25) { // Limitar a 25 caracteres
                                        setContrasena(e.target.value);
                                    }
                                }}
                                required
                            />
                            <span className="password-icon" onClick={handleContrasenaVisibility}>
                                {contrasenaVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit">Entrar</button>
                    </form>

                    <form className={`formulario__register ${!isRegisterView ? 'hidden' : ''}`} onSubmit={handleRegisterSubmit}>
                        <h2>Registrarse</h2>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => {
                                if (e.target.value.length <= 15) { // Limitar a 15 caracteres
                                    setName(e.target.value);
                                }
                            }}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={lastName}
                            onChange={(e) => {
                                if (e.target.value.length <= 15) { // Limitar a 15 caracteres
                                    setLastName(e.target.value);
                                }
                            }}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo"
                            value={correo_usuarios}
                            onChange={(e) => {
                                if (e.target.value.length <= 25) { // Limitar a 25 caracteres
                                    setCorreoUsuarios(e.target.value);
                                }
                            }}
                            required
                        />
                        <div className="password-container">
                            <input
                                type={contrasenaVisible ? 'text' : 'password'}
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => {
                                    if (e.target.value.length <= 25) { // Limitar a 25 caracteres
                                        setContrasena(e.target.value);
                                    }
                                }}
                                required
                            />
                            <span className="password-icon" onClick={handleContrasenaVisibility}>
                                {contrasenaVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
