const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

app.post('/enviar-correo', (req, res) => {
  const { nombre, apellido, correo, telefono, ciudad, pais, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'joaaan.fontechaa@gmail.com', // Tu correo
      pass: 'nvua ymua zjau zenz' // Contraseña de aplicación de Gmail
    },
  });

  const mailOptions = {
    from: 'joaaan.fontechaa@gmail.com',
    to: 'mapachesr777@gmail.com', // Tu correo de pruebas
    subject: `Nuevo mensaje de ${nombre} ${apellido}`,
    text: `
      Nombre: ${nombre}
      Apellido: ${apellido}
      Correo: ${correo}
      Teléfono: ${telefono}
      Ciudad: ${ciudad}
      País: ${pais}
      Mensaje: ${mensaje}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error al enviar el correo');
    } else {
      return res.status(200).send('Correo enviado exitosamente');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
