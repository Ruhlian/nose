import api from './Api';

const AuthService = {
    // Método para iniciar sesión
    loginUser: async (correo_usuarios, contrasena) => {
        console.log('Intentando iniciar sesión con:', { correo_usuarios, contrasena });

        // Validaciones previas
        if (!correo_usuarios || !contrasena) {
            throw new Error('Por favor, ingrese todos los campos requeridos.');
        }

        try {
            const response = await api.post('/usuarios/loginUser', { correo_usuarios, contrasena });
            console.log('Respuesta del servidor:', response);

            if (response.status === 200) {
                const { data } = response; // Desestructurando para obtener solo los datos
                console.log('Inicio de sesión exitoso, datos recibidos:', data);
                return data; // Aquí deberías recibir tanto el token como el usuario
            } else {
                throw new Error('Error en el inicio de sesión');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            throw AuthService.handleError(error, 'Error en el inicio de sesión');
        }
    },

    // Método para registrar un nuevo usuario
    registerUser: async (nombre, apellido, correo_usuarios, contrasena) => {
        console.log('Registrando nuevo usuario:', { nombre, apellido, correo_usuarios, contrasena });

        // Validaciones previas
        if (!nombre || !apellido || !correo_usuarios || !contrasena) {
            throw new Error('Por favor, ingrese todos los campos requeridos.');
        }

        try {
            const response = await api.post('/usuarios/registerUser', { nombre, apellido, correo_usuarios, contrasena });
            console.log('Respuesta del servidor para registro:', response);

            if (response.status === 201) {
                const { data } = response; // Desestructurando para obtener solo los datos
                console.log('Registro exitoso, datos recibidos:', data);
                
                if (!data || !data.ID_Usuarios) {
                    throw new Error('No se encontró el usuario en la respuesta.');
                }

                return data; // Devolvemos los datos del usuario
            } else {
                throw new Error('Error en el registro');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            throw AuthService.handleError(error, 'Error en el registro');
        }
    },

    // Método para solicitar el restablecimiento de contraseña
    requestPasswordReset: async (correo_usuarios) => {
        console.log('Solicitando restablecimiento de contraseña para:', { correo_usuarios });

        // Validaciones previas
        if (!correo_usuarios) {
            throw new Error('Por favor, ingrese el correo electrónico.');
        }

        try {
            const response = await api.post('/usuarios/request-password-reset', { correo_usuarios });
            console.log('Respuesta del servidor para solicitud de restablecimiento:', response);

            // Cambiar a 200 si el correo no está registrado
            if (response.status === 200) {
                // Puedes ajustar esto para que sea más claro en el frontend
                if (response.data.message) {
                    return response.data.message; // Si el servidor envía un mensaje
                }
                return response.data; // Devuelve los datos de la respuesta
            } else {
                throw new Error('Error en la solicitud de restablecimiento de contraseña');
            }
        } catch (error) {
            console.error('Error en la solicitud de restablecimiento de contraseña:', error);
            throw AuthService.handleError(error, 'Error en la solicitud de restablecimiento de contraseña');
        }
    },

// Método para restablecer la contraseña
resetPassword: async (token, contrasena) => { 
    console.log('Restableciendo la contraseña con el token:', token);

    // Validaciones previas
    if (!token || !contrasena) {
        throw new Error('Por favor, ingrese el token y la nueva contraseña.'); // Verifica que ambos estén presentes
    }

    try {
        // Asegúrate de enviar 'contrasena' en lugar de 'nuevaContrasena' en el cuerpo
        const response = await api.post(`/usuarios/reset-password/${token}`, { contrasena }); 
        console.log('Respuesta del servidor para restablecimiento de contraseña:', response);

        if (response.status === 200) {
            return response.data; // Devuelve los datos si todo es correcto
        } else {
            throw new Error('Error en el restablecimiento de contraseña');
        }
    } catch (error) {
        console.error('Error en el restablecimiento de contraseña:', error);
        throw AuthService.handleError(error, 'Error en el restablecimiento de contraseña');
    }
},

    // Método para verificar el token
    verifyToken: async (token) => {
        console.log('Verificando token:', token);

        try {
            const response = await api.get(`/usuarios/verify-token/${token}`);
            console.log('Token verificado con éxito:', response);
            return response.data; // Esto puede incluir información del usuario si es necesario
        } catch (error) {
            console.error('Error al verificar el token:', error);
            throw AuthService.handleError(error, 'Token inválido o expirado.');
        }
    },

    // Método para manejar errores de manera centralizada
    handleError: (error, defaultMessage) => {
        if (error.response) {
            return new Error(error.response.data.message || defaultMessage);
        } else if (error.request) {
            return new Error('Error en la solicitud, intente nuevamente.');
        } else {
            return new Error('Error desconocido: ' + error.message);
        }
    },

    // Método para cerrar sesión
    logoutUser: () => {
        console.log('Cerrando sesión...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export default AuthService;