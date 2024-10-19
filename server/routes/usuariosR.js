const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, login, register, deleteUserById } = require('../controllers/usuariosC');
const authMiddleware = require('../middlewares/authM'); // Importar el middleware

// Ruta para obtener todos los usuarios (protegida)
router.get('/', authMiddleware, getAllUsers); // Usar el middleware aquí

// Ruta para obtener un usuario por ID (protegida)
router.get('/:id', authMiddleware, getUserById); // Usar el middleware aquí

// Ruta para iniciar sesión
router.post('/LoginUser', login); // Cambiado a 'LoginUser'

// Ruta para registrar un nuevo usuario
router.post('/RegisterUser', register); // Cambiado a 'RegisterUser'

// Ruta para eliminar un usuario (protegida)
router.delete('/:id', authMiddleware, deleteUserById); // Usar el middleware aquí

module.exports = router;
