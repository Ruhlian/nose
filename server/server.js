// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const usuariosR = require('./routes/usuariosR'); // Asegúrate de que esta ruta sea correcta
require('dotenv').config(); // Asegúrate de requerir dotenv para usar las variables de entorno

app.use(cors()); // Permitir CORS
app.use(express.json()); // Analizar cuerpos JSON
app.use('/api/usuarios', usuariosR); // Usar rutas de usuarios

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3002; // Puedes usar una variable de entorno para el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
