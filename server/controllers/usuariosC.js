const { Usuario, ResetTokens } = require('../models/usuariosM');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailerC'); // Transportador de Nodemailer
const connection = require('../config/conexion'); // Ajusta la ruta según tu estructura de carpetas
const { body, validationResult } = require('express-validator');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    console.log('Solicitud para obtener todos los usuarios recibida.');
    console.log('Usuario autenticado:', req.user);
    try {
        const users = await Usuario.getAllUsers();
        console.log('Usuarios obtenidos exitosamente:', users);
        res.json(users);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        return res.status(500).json({ error: 'Error en la base de datos.' });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(`Solicitud para obtener usuario con ID: ${id}`);
    console.log('Usuario autenticado:', req.user);

    try {
        const user = await Usuario.findById(id);
        if (!user) {
            console.warn(`Usuario no encontrado con ID: ${id}`);
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        console.log(`Usuario encontrado:`, user);
        res.json(user);
    } catch (err) {
        console.error('Error al buscar usuario por ID:', err);
        return res.status(500).json({ error: 'Error en la base de datos.' });
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    const { correo_usuarios, contrasena } = req.body; // Aquí también debe ser 'contrasena'

    try {
        const user = await Usuario.findByEmail(correo_usuarios);
        if (!user) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const token = jwt.sign({ id: user.ID_Usuarios, rol: user.ID_Rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user.ID_Usuarios,
                nombre: user.Nombre,
                apellido: user.Apellido,
                correo_usuarios: user.Correo_Usuarios,
                rol: user.ID_Rol,
            },
            message: 'Login exitoso',
        });
    } catch (err) {
        return res.status(500).json({ error: 'Error en la base de datos.' });
    }
};

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { nombre, apellido, correo_usuarios, contrasena, ID_Rol } = req.body;
    console.log(`Solicitud de registro recibida para: ${correo_usuarios}`);

    const defaultRoleId = 3; 
    const roleId = ID_Rol || defaultRoleId; // Usa el ID_Rol si existe, de lo contrario usa el por defecto

    if (!nombre || !apellido || !correo_usuarios || !contrasena) {
        console.warn('Datos de registro incompletos:', { nombre, apellido, correo_usuarios });
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const [existingUser] = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Usuarios WHERE Correo_Usuarios = ?';
            connection.query(query, [correo_usuarios], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (existingUser) {
            console.warn('El correo ya está registrado:', correo_usuarios);
            return res.status(409).json({ error: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        console.log('Contraseña encriptada para el nuevo usuario.');

        const { insertId } = await new Promise((resolve, reject) => {
            const query = 'INSERT INTO Usuarios (Correo_Usuarios, contrasena, nombre, apellido, ID_Rol) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [correo_usuarios, hashedPassword, nombre, apellido, roleId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        console.log('Registro exitoso del nuevo usuario:', { ID_Usuarios: insertId, correo_usuarios, nombre, apellido, ID_Rol: roleId });
        res.status(201).json({ ID_Usuarios: insertId, correo_usuarios, nombre, apellido, ID_Rol: roleId });
    } catch (err) {
        console.error('Error en el registro del usuario:', err);
        res.status(500).json({ error: 'Error en la base de datos.' });
    }
};

// Eliminar un usuario por ID
const deleteUserById = async (req, res) => {
    const { id } = req.params;
    console.log(`Solicitud para eliminar usuario con ID: ${id}`);
    console.log('Usuario autenticado:', req.user);

    const query = 'DELETE FROM Usuarios WHERE ID_Usuarios = ?';

    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error al eliminar el usuario:', err);
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (results.affectedRows === 0) {
            console.warn(`No se encontró usuario para eliminar con ID: ${id}`);
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        console.log(`Usuario con ID ${id} eliminado con éxito.`);
        res.status(200).json({ message: `Usuario con ID ${id} eliminado con éxito.` });
    } catch (err) {
        console.error('Error al eliminar el usuario:', err);
        return res.status(500).json({ error: 'Error en la base de datos.' });
    }
};

// Cambiar el rol de un usuario por ID
const changeUserRole = async (req, res) => {
    const { id } = req.params; 
    const { ID_Rol } = req.body;

    const query = 'UPDATE Usuarios SET ID_Rol = ? WHERE ID_Usuarios = ?';

    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, [ID_Rol, id], (err, results) => {
                if (err) {
                    console.error('Error al cambiar el rol del usuario:', err);
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (results.affectedRows === 0) {
            console.warn(`No se encontró usuario para cambiar el rol con ID: ${id}`);
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        console.log(`Rol del usuario con ID ${id} cambiado a ${ID_Rol}.`);
        res.json({ message: `Rol del usuario con ID ${id} cambiado a ${ID_Rol}.` });
    } catch (err) {
        console.error('Error al cambiar el rol del usuario:', err);
        return res.status(500).json({ error: 'Error en la base de datos.' });
    }
};

// Solicitud de restablecimiento de contraseña
const requestPasswordReset = async (req, res) => {
    await body('correo_usuarios').isEmail().withMessage('Correo no válido.')(req, res, async () => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { correo_usuarios } = req.body;
        console.log(`Solicitud de restablecimiento de contraseña recibida para: ${correo_usuarios}`);

        try {
            const user = await Usuario.findByEmail(correo_usuarios);
            if (!user) {
                console.warn('Intento de restablecimiento de contraseña para un usuario no registrado.');
                return res.status(200).json({ message: 'Si el correo está registrado, se enviará un enlace para restablecer la contraseña.' });
            }

            const resetToken = jwt.sign({ id: user.ID_Usuarios }, process.env.JWT_SECRET, { expiresIn: '15m' });
            console.log('Token de restablecimiento generado:', resetToken);

            await ResetTokens.createToken(resetToken, user.ID_Usuarios);
            console.log('Token guardado en la base de datos para el usuario:', user.ID_Usuarios);

            const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
            console.log('Enlace de restablecimiento generado:', resetLink);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: correo_usuarios,
                subject: 'Restablecer contraseña',
                html: `<p>Hola,</p><p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">Restablecer contraseña</a>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo de restablecimiento:', error);
                    return res.status(500).json({ error: 'Error al enviar el correo de restablecimiento.' });
                }
                console.log('Correo de restablecimiento enviado:', info.response);
                return res.status(200).json({ message: 'Si el correo está registrado, se enviará un enlace para restablecer la contraseña.' });
            });
        } catch (err) {
            console.error('Error en la solicitud de restablecimiento de contraseña:', err);
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }
    });
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { contrasena } = req.body;

    if (!contrasena) {
        console.warn('Nueva contraseña no proporcionada.');
        return res.status(400).json({ error: 'Nueva contraseña es obligatoria.' });
    }

    console.log('Token recibido en la solicitud:', token);
    console.log('Contraseña recibida en la solicitud:', contrasena);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ID_Usuarios = decoded.id;
        console.log('ID de usuario decodificado del token:', ID_Usuarios);

        const userToken = await ResetTokens.findByUserId(ID_Usuarios);
        if (!userToken) {
            console.warn('Token de restablecimiento no encontrado para el usuario:', ID_Usuarios);
            return res.status(403).json({ error: 'Token no válido o expirado.' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        await Usuario.updatePassword(ID_Usuarios, hashedPassword);
        console.log('Contraseña actualizada exitosamente para el usuario:', ID_Usuarios);

        await ResetTokens.deleteToken(ID_Usuarios);
        console.log('Token de restablecimiento eliminado de la base de datos.');

        res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (err) {
        console.error('Error al restablecer la contraseña:', err.message);
        return res.status(500).json({ error: 'Error en la base de datos.', details: err.message });
    }
};


const verifyToken = (req, res) => {
    const token = req.params.token; // Obtén el token de los parámetros de la ruta

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        return res.status(200).json({ message: 'Token válido', user });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
    deleteUserById,
    changeUserRole,
    requestPasswordReset,
    resetPassword,
    verifyToken,
};
