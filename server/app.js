    const express = require('express');
    const cors = require('cors');
    const usuariosR = require('./routes/usuariosR'); // Asegúrate de que esta ruta sea correcta
    const authMiddleware = require('./middlewares/authM'); // Importa tu middleware de autenticación
    const { ResetTokens } = require('./models/usuariosM'); // Importa correctamente el modelo de ResetTokens
    require('dotenv').config(); // Cargar las variables de entorno
    const cron = require('node-cron'); // Importa node-cron

    const app = express(); // Crear la aplicación Express

    // Middleware
    app.use(cors()); // Permitir CORS
    app.use(express.json()); // Analizar cuerpos JSON

    // Usar rutas de usuarios
    app.use('/api/usuarios', usuariosR); // Asegúrate de que las rutas en usuariosR estén configuradas correctamente

    // Ejemplo de una ruta protegida
    app.get('/ruta-protegida', authMiddleware, (req, res) => {
        res.json({ message: 'Acceso concedido', user: req.user });
    });

    // Manejo de errores
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Algo salió mal!' });
    });

    // Programar la tarea para que se ejecute cada 30 minutos
    cron.schedule('*/30 * * * *', async () => {
        console.log('Ejecutando limpieza de tokens expirados...');
        try {
            await ResetTokens.deleteExpiredTokens(); // Asegúrate de que esta función maneje correctamente los errores
        } catch (err) {
            console.error('Error al eliminar tokens expirados:', err);
        }
    });

    // Configurar el puerto
    const PORT = process.env.PORT || 3002; // Puedes usar una variable de entorno para el puerto
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
