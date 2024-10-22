const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Correo de la empresa
        pass: process.env.EMAIL_PASS, // Contraseña de la empresa
    },
});

const sendMail = async (from, to, subject, text) => {
    const mailOptions = {
        from, // Remitente: correo del usuario
        to, // Destinatario: correo de la empresa
        subject,
        text,
        html: `<p>${text}</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo');
    }
};

module.exports = sendMail;
