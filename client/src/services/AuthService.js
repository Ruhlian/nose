import api from './Api';

const AuthService = {
    loginUser: async (correo_usuarios, contrasena) => {
        console.log('Intentando iniciar sesión con:', { correo_usuarios, contrasena });

        // Validaciones previas
        if (!correo_usuarios || !contrasena) {
            throw new Error('Por favor, ingrese todos los campos requeridos.');
        }

        try {
            const response = await api.post('/usuarios/LoginUser', {
                correo_usuarios,
                contrasena,
            });

            console.log('Respuesta del servidor:', response); // Muestra la respuesta completa del servidor

            if (response.status === 200) {
                const { data } = response; // Desestructurando para obtener solo los datos
                console.log('Inicio de sesión exitoso, datos recibidos:', data);
                return data; // Aquí deberías recibir tanto el token como el usuario
            } else {
                throw new Error('Error en el inicio de sesión');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);

            if (error.response) {
                // El servidor respondió con un código de estado diferente a 2xx
                throw new Error(error.response.data.message || 'Error en el inicio de sesión');
            } else if (error.request) {
                // La solicitud se hizo pero no se recibió respuesta
                throw new Error('Error en la solicitud, intente nuevamente.');
            } else {
                // Algo sucedió al configurar la solicitud
                throw new Error('Error desconocido: ' + error.message);
            }
        }
    },

    registerUser: async (nombre, apellido, correo_usuarios, contrasena) => {
        console.log('Registrando nuevo usuario:', { nombre, apellido, correo_usuarios, contrasena });

        // Validaciones previas
        if (!nombre || !apellido || !correo_usuarios || !contrasena) {
            throw new Error('Por favor, ingrese todos los campos requeridos.');
        }

        try {
            const response = await api.post('/usuarios/RegisterUser', {
                nombre,
                apellido,
                correo_usuarios,
                contrasena,
            });

            console.log('Respuesta del servidor para registro:', response); // Muestra la respuesta para el registro

            // Aquí aseguramos que estamos verificando el status correcto
            if (response.status === 201) {
                const { data } = response; // Desestructurando para obtener solo los datos
                console.log('Registro exitoso, datos recibidos:', data);
                
                // Verificamos si tenemos los datos esperados
                if (!data || !data.ID_Usuarios) {
                    throw new Error('No se encontró el usuario en la respuesta.');
                }

                return data; // Devolvemos los datos del usuario
            } else {
                throw new Error('Error en el registro');
            }
        } catch (error) {
            console.error('Error en el registro:', error);

            if (error.response) {
                // El servidor respondió con un código de estado diferente a 2xx
                throw new Error(error.response.data.message || 'Error en el registro');
            } else if (error.request) {
                // La solicitud se hizo pero no se recibió respuesta
                throw new Error('Error en la solicitud, intente nuevamente.');
            } else {
                // Algo sucedió al configurar la solicitud
                throw new Error('Error desconocido: ' + error.message);
            }
        }
    },

    logoutUser: () => {
        console.log('Cerrando sesión...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export default AuthService;
