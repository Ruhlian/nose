const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
    deleteUserById,
    changeUserRole,
    requestPasswordReset,
    resetPassword,
    verifyToken,
    enviarCorreo
} = require('../controllers/usuariosC');
const authMiddleware = require('../middlewares/authM');

// Rutas protegidas
router.get('/', authMiddleware, async (req, res) => {
    console.log('Accediendo a la lista de usuarios');
    try {
        await getAllUsers(req, res);
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
}); 

router.get('/:id', authMiddleware, async (req, res) => {
    console.log(`Obteniendo usuario con ID: ${req.params.id}`);
    try {
        await getUserById(req, res);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
}); 

router.delete('/:id', authMiddleware, async (req, res) => {
    console.log(`Eliminando usuario con ID: ${req.params.id}`);
    try {
        await deleteUserById(req, res);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}); 

router.put('/changeRole/:id', authMiddleware, async (req, res) => {
    console.log(`Cambiando el rol del usuario con ID: ${req.params.id}`);
    try {
        await changeUserRole(req, res);
    } catch (error) {
        console.error('Error al cambiar el rol del usuario:', error);
        res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
    }
});

// Rutas no protegidas
router.post('/loginUser', async (req, res) => {
    console.log('Intentando iniciar sesión');
    try {
        await loginUser(req, res);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

router.post('/registerUser', async (req, res) => {
    console.log('Registrando un nuevo usuario');
    try {
        await registerUser(req, res);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

router.post('/request-password-reset', async (req, res) => {
    console.log('Solicitando restablecimiento de contraseña');
    try {
        await requestPasswordReset(req, res);
    } catch (error) {
        console.error('Error al solicitar el restablecimiento de contraseña:', error);
        res.status(500).json({ error: 'Error al solicitar el restablecimiento de contraseña' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    console.log(`Restableciendo contraseña con token: ${req.params.token}`);
    try {
        await resetPassword(req, res);
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ error: 'Error al restablecer la contraseña' });
    }
});

router.get('/verify-token/:token', async (req, res) => {
    console.log(`Verificando el token: ${req.params.token}`);
    try {
        await verifyToken(req, res);
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(500).json({ error: 'Error al verificar el token' });
    }
});

// Nueva ruta para enviar correos
router.post('/enviarCorreo', authMiddleware, async (req, res) => {
    console.log('Enviando correo');
    try {
        await enviarCorreo(req, res);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

module.exports = router;
