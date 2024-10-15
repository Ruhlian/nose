// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authC');

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router;
