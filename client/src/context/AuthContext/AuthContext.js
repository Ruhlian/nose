import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserSession = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (storedUser && token) {
                // Verificar el token en el servidor
                try {
                    const isValid = await AuthService.verifyToken(token);
                    if (isValid) {
                        try {
                            const parsedUser = JSON.parse(storedUser);
                            setUser(parsedUser);
                        } catch (err) {
                            console.error("Error al parsear el usuario de localStorage:", err);
                        }
                    } else {
                        // Token no válido, limpiar localStorage
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
                        navigate('/Login'); // Redirigir a la página de inicio de sesión
                    }
                } catch (err) {
                    console.error("Error al verificar el token:", err);
                    // Limpiar en caso de error
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkUserSession();
    }, [navigate]); // Añadir navigate como dependencia

    const showToast = (message, type) => {
        const currentTime = Date.now();
        if (!showToast.lastToast || currentTime - showToast.lastToast >= 5000) {
            showToast.lastToast = currentTime;
            switch (type) {
                case 'success':
                    toast.success(message, { autoClose: 1000 });
                    break;
                case 'error':
                    toast.error(message, { autoClose: 1000 });
                    break;
                case 'info':
                    toast.info(message, { autoClose: 1000 });
                    break;
                default:
                    break;
            }
        }
    };

    const handleLogin = async (correo_usuarios, contrasena) => {
        setLoading(true);
        try {
            const data = await AuthService.loginUser(correo_usuarios, contrasena);
            if (data.user) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                showToast('Inicio de sesión exitoso!', 'success');
                navigate('/'); // Cambia '/' por la ruta a la que quieras redirigir
            } else {
                throw new Error('No se encontró el usuario en la respuesta.');
            }
        } catch (err) {
            console.error("Error en inicio de sesión:", err);
            showToast('Error al iniciar sesión. Verifica tus credenciales.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (name, lastName, correo_usuarios, contrasena) => {
        setLoading(true);
        try {
            const response = await AuthService.registerUser(name, lastName, correo_usuarios, contrasena);
            const userData = response;

            if (userData && userData.ID_Usuarios) {
                showToast('Registro exitoso. Iniciando sesión automáticamente...', 'success');
                await handleLogin(correo_usuarios, contrasena);
            } else {
                throw new Error('No se encontró el usuario en la respuesta.');
            }
        } catch (err) {
            console.error("Error en registro:", err);
            showToast('Error al registrar el usuario. Inténtalo de nuevo.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        showToast('Has cerrado sesión con éxito.', 'info');
    
        // Redirigir a la página de inicio de sesión
        navigate('/Login');
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleRegister, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
