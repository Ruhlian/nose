import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (err) {
                console.error("Error al parsear el usuario de localStorage:", err);
            }
        }
        setLoading(false);
    }, []);

    const showToast = (message, type) => {
        const currentTime = Date.now();
        if (!showToast.lastToast || currentTime - showToast.lastToast >= 5000) {
            showToast.lastToast = currentTime;
            switch (type) {
                case 'success':
                    toast.success(message, { autoClose: 1500 });
                    break;
                case 'error':
                    toast.error(message, { autoClose: 1500 });
                    break;
                case 'info':
                    toast.info(message, { autoClose: 1500 });
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
                showToast('Inicio de sesión exitoso!', 'success'); // Mensaje de éxito
                
                // Redirige al usuario después de un inicio de sesión exitoso
                navigate('/'); // Asegúrate de cambiar '/' por la ruta a la que quieras redirigir
            } else {
                throw new Error('No se encontró el usuario en la respuesta.');
            }
        } catch (err) {
            console.error("Error en inicio de sesión:", err);
            showToast('Error al iniciar sesión. Verifica tus credenciales.', 'error'); // Mensaje de error
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
        showToast('Has cerrado sesión con éxito.', 'info'); // Mensaje de alerta al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleRegister, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
