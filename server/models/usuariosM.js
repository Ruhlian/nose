const db = require('../config/conexion');

class Usuario {
    // Obtener todos los usuarios
    static getAllUsers(callback) {
        const query = 'SELECT * FROM Usuarios';
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }

    // Buscar usuario por correo
    static findByEmail(correo_usuarios, callback) {
        const query = 'SELECT * FROM Usuarios WHERE Correo_Usuarios = ?';
        db.query(query, [correo_usuarios], (err, results) => {
            if (err) return callback(err, null);
            console.log('Resultados de búsqueda por correo:', results); // Log para verificar resultados
            if (results.length === 0) return callback(null, null);
            callback(null, results[0]);
        });
    }

    // Crear nuevo usuario
    static createUser(userData, callback) {
        const { correo_usuarios, contrasena, nombre, apellido, rol } = userData; 
        const query = 'INSERT INTO Usuarios (Correo_Usuarios, contrasena, nombre, apellido, ID_Rol) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [correo_usuarios, contrasena, nombre, apellido, rol], (err, results) => {
            if (err) return callback(err, null);
            callback(null, { ID_Usuarios: results.insertId, ...userData }); // Cambiado a 'ID_Usuarios'
        });
    }

    // Buscar usuario por ID
    static findById(id, callback) {
        const query = 'SELECT * FROM Usuarios WHERE ID_Usuarios = ?'; // Cambiado a 'ID_Usuarios'
        db.query(query, [id], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);
            callback(null, results[0]);
        });
    }
}

module.exports = Usuario;