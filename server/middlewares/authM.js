const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token recibido:', token); // Log para ver el token recibido

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token inválido:', err.message); // Log para ver el error de verificación
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user;
        console.log('Usuario autenticado:', user); // Log para ver el usuario autenticado
        next();
    });
};

module.exports = authMiddleware;
