const transporter = require("../config/mailer");

const contactUsMail = async (contact) => {
    const { message, firstName, lastName, email } = contact;

    try {
        await transporter.sendMail({
            from: `"Boxonia Contact" <${process.env.ADMIN_EMAIL || process.env.MAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
            subject: 'New Contact Request',
            text: `
            You have a new contact request.
            Name: ${firstName} ${lastName}
            Email: ${email}
            Subject: 'Contact Mail
            Message: ${message}
            `,
            html: `
                <h2>New Contact Request</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong>Contact Mail</p>
                <p><strong>Message:</strong><br/> ${message}</p>
            `})
        console.log('Email is sending....')
    } catch (err) {
        console.error('Error sending contact email:', err);
    }
};

const autoReplyMail = async (contact) => {
    const { firstName, lastName, email } = contact;

    try {
        await transporter.sendMail({
            from: `"Boxonia" <${process.env.ADMIN_EMAIL || process.env.MAIL_USER}>`,
            to: `${firstName} ${lastName} <${email}>`,
            subject: `We received your request`,
            text: `Hello ${firstName} ${lastName},\n\nThank you for reaching out to Boxonia Blueprint. We’ve received your message and truly appreciate your interest.
            \n\nAt Boxonia Blueprint, we tell exportable, authentic, and audacious African stories, rooted in Africa, made for the world.
            \n\nOur team is currently reviewing your inquiry and will get back to you as soon as possible.
            \n\nWarm regards,\nThe Boxonia Blueprint Team`,
            html: `
        <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
        <p>Thank you for reaching out to Boxonia Blueprint. We’ve received your message and truly appreciate your interest.</p>
        <p>At Boxonia Blueprint, we tell exportable, authentic, and audacious African stories, rooted in Africa, made for the world.</p>
        <p>Our team is currently reviewing your inquiry and will get back to you as soon as possible.</p>

        <p>Warm regards,<br/>The Boxonia Blueprint Team</p>
      `,
        });
        return true;
    } catch (err) {
        console.error('Error sending auto-reply:', err);
        return false;
    }
};

const bookTalentMail = async (booking, talent) => {
    const { type, platform, synopsis, duration, payment, fullName, email } = booking;
    const { firstName, lastName } = talent;

    await transporter.sendMail({
        from: `${fullName} <${email}>`,
        to: `"Boxonia HQ" <${process.env.ADMIN_EMAIL || process.env.MAIL_USER}>`,
        subject: "New Talent Booking Request",
        text: `
            You have a new booking request.

            Name: ${fullName}
            email: ${email}
            Type: ${type.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
            Platform: ${platform.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
            Synopsis: ${synopsis}
            Duration: ${duration}
            Payment: ${payment}
            Talent: ${firstName} ${lastName}
        `,
        html: `
            <h2>New Booking Request</h2>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${type.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}</p>
            <p><strong>Platform:</strong> ${platform.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}</p>
            <p><strong>Synopsis:</strong> ${synopsis}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Payment:</strong> ${payment}</p>
            <p><strong>Talent:</strong> ${firstName} ${lastName}</p>
        `,
    });
};

module.exports = {
    contactUsMail,
    autoReplyMail,
    bookTalentMail
}
