import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify'; // Importa toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de que el estilo de toast esté incluido

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/usuarios');
            const foundUser = response.data.find(
                (u) => u.correo === credentials.email && u.password === credentials.password
            );
            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
                toast.success('Inicio de sesión exitoso!');
            } else {
                toast.error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error al intentar iniciar sesión. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        toast.info('Has cerrado sesión.');
    };

    const register = async (userData) => {
        try {
            const userWithRole = { ...userData, rol: 'Usuario' };
            await axios.post('http://localhost:3001/usuarios', userWithRole);
            await login({ email: userData.correo, password: userData.password });
            toast.success('Registro exitoso. Estás ahora logueado.');
        } catch (error) {
            console.error('Error registering:', error);
            toast.error('Error al registrar el usuario. Inténtalo de nuevo.');
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
