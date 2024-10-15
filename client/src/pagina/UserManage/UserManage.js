import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../../componentes/UserForm/UserForm';
import './UserManage.css';
import add from '../../assets/icons/add-azul.png';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/usuarios/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsEditing(true);
  };

  const handleFormSubmit = async (user) => {
    try {
      if (selectedUser) {
        await axios.put(`http://localhost:3001/usuarios/${selectedUser.id}`, user);
      } else {
        await axios.post('http://localhost:3001/usuarios', user);
      }
      fetchUsers();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="user-manage">
      <div className='header-title__container'>
        <h1 className='manage-title'>Gestión de Usuarios</h1>
        <img src={add} alt='add-icon__manage' onClick={handleAdd} className='add-icon__manage' />
      </div>
      {isEditing ? (
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className='user-table__container'>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nombre} {user.apellido}</td>
                <td>{user.correo}</td>
                <td>{user.rol}</td>
                <td className="user-actions">
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default UserManage;
