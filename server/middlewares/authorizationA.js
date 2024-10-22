// middlewares/authorizationA.js
const authorizationA = (req, res, next) => {
    const userRole = req.user.rol; // Asegúrate de que esto coincide con cómo asignas el rol en el JWT

    if (userRole !== 1) { // 1 = Administrador
        return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
    }

    next();
};

module.exports = authorizationA;
