const db = require('../config/conexion');
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt instalado

class Usuario {
    // Obtener todos los usuarios
    static async getAllUsers() {
        const query = 'SELECT * FROM Usuarios';
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            return results;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw new Error('No se pudieron obtener los usuarios.');
        }
    }

    // Buscar usuario por correo
    static async findByEmail(correo_usuarios) {
        const query = 'SELECT * FROM Usuarios WHERE Correo_Usuarios = ?';
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, [correo_usuarios], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            console.log('Resultados de búsqueda por correo:', results);
            return results.length === 0 ? null : results[0];
        } catch (error) {
            console.error('Error al buscar usuario por correo:', error);
            throw new Error('No se pudo buscar el usuario.');
        }
    }

    // Crear nuevo usuario
    static async createUser(userData) {
        const { correo_usuarios, contrasena, nombre, apellido, rol } = userData;
        const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar contraseña
        const query = 'INSERT INTO Usuarios (Correo_Usuarios, contrasena, nombre, apellido, ID_Rol) VALUES (?, ?, ?, ?, ?)';
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, [correo_usuarios, hashedPassword, nombre, apellido, rol], (err, results) => {
                    if (err) return reject(err);
                    resolve({ ID_Usuarios: results.insertId, ...userData });
                });
            });
            return results;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw new Error('No se pudo crear el usuario.');
        }
    }

    // Buscar usuario por ID
    static async findById(id) {
        const query = 'SELECT * FROM Usuarios WHERE ID_Usuarios = ?';
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, [id], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            return results.length === 0 ? null : results[0];
        } catch (error) {
            console.error('Error al buscar usuario por ID:', error);
            throw new Error('No se pudo buscar el usuario.');
        }
    }

    // Actualizar contraseña
    static async updatePassword(ID_Usuarios, contrasena) {
        const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar nueva contraseña
        const query = 'UPDATE Usuarios SET contrasena = ? WHERE ID_Usuarios = ?';
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, [hashedPassword, ID_Usuarios], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            // Verifica si se actualizó alguna fila
            if (results.affectedRows === 0) {
                throw new Error('Usuario no encontrado o no se pudo actualizar la contraseña.');
            }
            return { message: 'Contraseña actualizada exitosamente.' };
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            throw new Error('No se pudo actualizar la contraseña.');
        }
    }
}

// Modelo ResetTokens
class ResetTokens {
    static async deleteToken(ID_Usuarios) {
        const query = 'DELETE FROM ResetTokens WHERE ID_Usuarios = ?'; // Cambia `userId` a lo que corresponda en tu esquema
        try {
            await new Promise((resolve, reject) => {
                db.query(query, [ID_Usuarios], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            console.log('Token eliminado exitosamente para el usuario:', ID_Usuarios);
        } catch (error) {
            console.error('Error al eliminar el token:', error);
            throw new Error('No se pudo eliminar el token.');
        }
    }

    // Función para agregar un nuevo token
    static async createToken(token, userId) {
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
        const query = `INSERT INTO ResetTokens (token, ID_Usuarios, expiresAt, used) VALUES (?, ?, ?, FALSE)`;
        try {
            await new Promise((resolve, reject) => {
                db.query(query, [token, userId, expiresAt], (err) => {
                    if (err) return reject(err);
                    console.log('Nuevo token creado:', token);
                    resolve();
                });
            });
        } catch (error) {
            console.error('Error al crear token:', error);
            throw new Error('No se pudo crear el token.');
        }
    }

    // Función para buscar un token por ID de usuario
    static async findByUserId(ID_Usuarios) {
        const query = 'SELECT * FROM ResetTokens WHERE ID_Usuarios = ? AND used = FALSE AND expiresAt > NOW()';
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, [ID_Usuarios], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            return results.length === 0 ? null : results[0];
        } catch (error) {
            console.error('Error al buscar token por ID de usuario:', error);
            throw new Error('No se pudo buscar el token.');
        }
    }

    // Función para marcar un token como utilizado
    static async markAsUsed(token) {
        const query = 'UPDATE ResetTokens SET used = TRUE WHERE token = ?';
        try {
            await new Promise((resolve, reject) => {
                db.query(query, [token], (err) => {
                    if (err) return reject(err);
                    console.log('Token marcado como utilizado:', token);
                    resolve();
                });
            });
        } catch (error) {
            console.error('Error al marcar el token como utilizado:', error);
            throw new Error('No se pudo marcar el token como utilizado.');
        }
    }
}

module.exports = { Usuario, ResetTokens };
