const transporter = require("../config/mailer");

const contactUsMail = async (contact) => {
    const { subject, message, name, email } = contact;

    try {
        await transporter.sendMail({
            from: `"Boxonia Contact" <${process.env.ADMIN_EMAIL || process.env.MAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
            subject: `New Contact Request: ${subject}`,
            text: `
            You have a new contact request.
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
            `,
            html: `
                <h2>New Contact Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong><br/> ${message}</p>
            `})
        console.log('Email is sending....')
    } catch (err) {
        console.error('Error sending contact email:', err);
    }
};

const autoReplyMail = async (contact) => {
    const { name, email } = contact;

    try {
        await transporter.sendMail({
            from: `"Support Team" <${process.env.ADMIN_EMAIL || process.env.MAIL_USER}>`,
            to: email,
            subject: `We received your request`,
            text: `Hello ${name},\n\nThank you for contacting us. Our team will get back to you shortly.\n\nBest regards,\nSupport Team`,
            html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to us. Our team will get back to you shortly.</p>
        <p>Best regards,<br/>Support Team</p>
      `,
        });
        return true;
    } catch (err) {
        console.error('Error sending auto-reply:', err);
        return false;
    }
};

const bookTalentMail = async (booking) => {
    const { type, platform, synopsis, duration, payment } = booking;

    await transporter.sendMail({
        from: `"Talent Booking" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
        subject: `New Talent Booking Request: ${type}`,
        text: `
            You have a new booking request.

            Type: ${type}
            Platform: ${platform}
            Synopsis: ${synopsis}
            Duration: ${duration}
            Payment: ${payment}
        `,
        html: `
            <h2>New Booking Request</h2>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Platform:</strong> ${platform}</p>
            <p><strong>Synopsis:</strong> ${synopsis}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Payment:</strong> ${payment}</p>
        `,
    });
};


module.exports = {
    contactUsMail,
    autoReplyMail,
    bookTalentMail
}
