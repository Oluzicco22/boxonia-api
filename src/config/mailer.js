const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT), // convert string to number
    secure: Number(process.env.MAIL_PORT) === 465, // true for SSL (465), false for TLS (587)
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // helps prevent self-signed cert errors on Vercel
    },
});

// Optional: helps you confirm the connection works when deployed
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection failed:', error);
    } else {
        console.log('Zoho SMTP is ready to take messages');
    }
});

module.exports = transporter;
