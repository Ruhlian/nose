const Usuario = require('../models/usuariosM');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/conexion');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    console.log('Solicitud para obtener todos los usuarios recibida.');
    console.log('Usuario autenticado:', req.user);
    Usuario.getAllUsers((err, users) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }
        console.log('Usuarios obtenidos exitosamente:', users);
        res.json(users);
    });
};

// Obtener un usuario por ID
const getUserById = (req, res) => {
    const { id } = req.params;
    console.log(`Solicitud para obtener usuario con ID: ${id}`);
    console.log('Usuario autenticado:', req.user);

    Usuario.findById(id, (err, user) => {
        if (err) {
            console.error('Error al buscar usuario por ID:', err);
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }
        if (!user) {
            console.warn(`Usuario no encontrado con ID: ${id}`);
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        console.log(`Usuario encontrado:`, user);
        res.json(user);
    });
};

// Iniciar sesión
const login = (req, res) => {
    const { correo_usuarios, contrasena } = req.body;
    console.log(`Solicitud de inicio de sesión recibida para: ${correo_usuarios}`);

    Usuario.findByEmail(correo_usuarios, async (err, user) => {
        if (err) {
            console.error('Error al buscar usuario por correo:', err);
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }

        console.log('Usuario encontrado:', user);

        if (!user) {
            console.warn('Usuario no encontrado con el correo proporcionado.');
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const isMatch = await bcrypt.compare(contrasena, user.contrasena);

        if (!isMatch) {
            console.warn('Contraseña incorrecta para el usuario:', correo_usuarios);
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const token = jwt.sign({ id: user.ID_Usuarios, rol: user.ID_Rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Modificación aquí para incluir nombre, apellido y correo
        res.json({
            token,
            user: {
                id: user.ID_Usuarios, // Asegúrate que 'ID_Usuarios' sea el nombre del campo en la base de datos
                nombre: user.Nombre,  // Asegúrate que 'Nombre' sea el nombre del campo en la base de datos
                apellido: user.Apellido,  // Asegúrate que 'Apellido' sea el nombre del campo en la base de datos
                correo_usuarios: user.Correo_Usuarios, // Asegúrate que 'Correo_Usuarios' sea el nombre del campo en la base de datos
                rol: user.ID_Rol
            },
            message: 'Login exitoso'
        });
    });
};

// Registrar un nuevo usuario
const register = async (req, res) => {
    const { nombre, apellido, correo_usuarios, contrasena, ID_Rol } = req.body;
    console.log(`Solicitud de registro recibida para: ${correo_usuarios}`);

    const defaultRoleId = 3; 
    const roleId = ID_Rol ? ID_Rol : defaultRoleId;

    if (!nombre || !apellido || !correo_usuarios || !contrasena) {
        console.warn('Datos de registro incompletos:', { nombre, apellido, correo_usuarios });
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const existingUser = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Usuarios WHERE Correo_Usuarios = ?';
            connection.query(query, [correo_usuarios], (err, results) => {
                if (err) {
                    console.error('Error al consultar el usuario existente:', err);
                    return reject(err);
                }
                resolve(results[0]); 
            });
        });

        if (existingUser) {
            console.warn('El correo ya está registrado:', correo_usuarios);
            return res.status(409).json({ error: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        console.log('Contraseña encriptada para el nuevo usuario.');

        const newUser = await new Promise((resolve, reject) => {
            const query = 'INSERT INTO Usuarios (Correo_Usuarios, contrasena, nombre, apellido, ID_Rol) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [correo_usuarios, hashedPassword, nombre, apellido, roleId], (err, results) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return reject(err);
                }
                resolve({ ID_Usuarios: results.insertId, correo_usuarios, nombre, apellido, ID_Rol: roleId });
            });
        });

        console.log('Registro exitoso del nuevo usuario:', newUser);
        res.status(201).json(newUser); // Devolviendo ID_Usuarios
    } catch (err) {
        console.error('Error en el registro del usuario:', err);
        res.status(500).json({ error: 'Error en la base de datos.' });
    }
};

// Eliminar un usuario por ID
const deleteUserById = (req, res) => {
    const { id } = req.params;
    console.log(`Solicitud para eliminar usuario con ID: ${id}`);
    console.log('Usuario autenticado:', req.user);

    const query = 'DELETE FROM Usuarios WHERE ID_Usuarios = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }
        if (results.affectedRows === 0) {
            console.warn(`No se encontró usuario para eliminar con ID: ${id}`);
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        console.log(`Usuario con ID ${id} eliminado con éxito.`);
        res.status(200).json({ message: `Usuario con ID ${id} eliminado con éxito.` });
    });
};

// Exportar las funciones de usuario
module.exports = {
    getAllUsers,
    getUserById,
    login,
    register,
    deleteUserById,
};
