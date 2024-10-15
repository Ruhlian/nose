import React, { useState, useEffect } from 'react';
import './UserForm.css'


const UserForm = ({ user, onSubmit, onCancel }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        if (user) {
            setNombre(user.nombre);
            setApellido(user.apellido);
            setCorreo(user.correo);
            setPassword(user.password);
            setRol(user.rol);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nombre, apellido, correo, password, rol });
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Apellido:</label>
                <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Correo:</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Rol:</label>
                <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    required
                >
                    <option value="Administrador">Administrador</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Usuario">Usuario</option>
                </select>
            </div>
            <div className='users-button-action__container'>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>
                Cancelar
            </button>
            </div>
        </form>
    );
};

export default UserForm;
