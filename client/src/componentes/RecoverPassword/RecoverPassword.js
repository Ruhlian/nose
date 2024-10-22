import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';
import './RecoverPassword.css';

const RecoverPassword = () => {
    const [correo_usuarios, setCorreoUsuarios] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setLoading(true); // Indica que se está procesando la solicitud

        try {
            await AuthService.requestPasswordReset(correo_usuarios);
            toast.success('Se ha enviado un correo para restablecer su contraseña.');
            setCorreoUsuarios(''); // Limpiar el campo
        } catch (error) {
            toast.error(error.message || 'Error al solicitar el restablecimiento de contraseña.');
        } finally {
            setLoading(false); // Restablecer el estado de carga
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleRequestReset}>
                <h2>Solicitud para restablecer la contraseña</h2>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={correo_usuarios}
                    onChange={(e) => setCorreoUsuarios(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Solicitar Restablecimiento'}
                </button>
            </form>
        </div>
    );
};

export default RecoverPassword;
