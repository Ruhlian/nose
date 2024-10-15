const mysql = require('mysql');
require('dotenv').config(); // Asegúrate de que dotenv se cargue aquí también

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = connection; // Exporta la conexión para usarla en otros módulos
