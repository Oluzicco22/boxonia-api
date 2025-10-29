// helpers/mailSender.js
const transporter = require("../config/mailer");

/**
 * Send notification email to the specific talent when someone books them.
 */
const bookTalentMail = async (booking, talent) => {
    const { type, platform, synopsis, duration, payment, fullName, email: bookingEmail } = booking || {};
    const talentEmail = talent?.email || talent?.socials?.email;
    const talentName = `${talent?.firstName || ""} ${talent?.lastName || ""}`.trim();

    if (!talentEmail) {
        console.warn("⚠️ No email found for this talent, skipping booking email.");
        return false;
    }

    try {
        const info = await transporter.sendMail({
            from: `"${fullName}" <${process.env.MAIL_USER}>`, // sender (authenticated mail)
            replyTo: bookingEmail || undefined, // booking user’s email
            to: `${talentName} <${talentEmail}>`, // only the talent’s email
            subject: `New Booking Request for ${talentName}`,
            text: `
You have a new booking request.

Name: ${fullName}
Email: ${bookingEmail}
Talent: ${talentName}
Type: ${type}
Platform: ${platform}
Synopsis: ${synopsis}
Duration: ${duration}
Payment: ${payment}
            `,
            html: `
        <h2>New Booking Request</h2>
        <p><strong>Talent:</strong> ${talentName}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${bookingEmail}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>Synopsis:</strong> ${synopsis}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Payment:</strong> ${payment}</p>
      `,
        });

        console.log(`✅ Booking email sent directly to ${talentEmail}: ${info?.messageId || info?.response || "ok"}`);
        return true;
    } catch (err) {
        console.error("❌ Error sending booking email:", err);
        return false;
    }
};

/**
 * Send an auto-reply email to the person who made the booking.
 */
const autoReplyBookingMail = async (booking, talent) => {
    const { fullName, email: bookingEmail } = booking || {};
    const talentName = `${talent?.firstName || ""} ${talent?.lastName || ""}`.trim();

    if (!bookingEmail) {
        console.warn("⚠️ No email found in booking, skipping auto-reply.");
        return false;
    }

    try {
        const info = await transporter.sendMail({
            from: `"Boxonia Blueprint" <${process.env.MAIL_USER}>`,
            to: `${fullName} <${bookingEmail}>`,
            subject: `Thank You for booking ${talentName}`,
            text: `Hello ${fullName},\n\n
            Thank you for booking ${talentName}. We’re thrilled to have you collaborate with this exceptional talent.\n\n 
            At Boxonia Blueprint, we champion exportable, authentic, audacious African stories, and our talents embody that spirit in every project they take on.\n\n
            Our team has received your booking details and will review them shortly. A representative will reach out to confirm next steps and any additional requirements.\n\n
            Warm regards,\n
            The Boxonia Blueprint Team`,
            html: `
        <p>Hello <strong>${fullName}</strong>,</p>
        <p>Thank you for booking <strong>${talentName}</strong>. We’re thrilled to have you collaborate with this exceptional talent.</p>
        <p>At Boxonia Blueprint, we champion exportable, authentic, audacious African stories, and our talents embody that spirit in every project they take on.</p>
        <p>Our team has received your booking details and will review them shortly. A representative will reach out to confirm next steps and any additional requirements.</p>
        <p>Warm regards,<br/>The Boxonia Blueprint Team</p>
      `,
        });

        console.log(`✅ Auto-reply booking email sent to ${bookingEmail}`);
        return true;
    } catch (err) {
        console.error("❌ Error sending auto-reply booking email:", err);
        return false;
    }
};

/**
 * Contact us email to admin (hq@boxonia.com)
 */
const contactUsMail = async (contact) => {
    const { message, firstName, lastName, email } = contact;

    try {
        await transporter.sendMail({
            from: `"Boxonia Contact" <${process.env.MAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
            replyTo: email || undefined,
            subject: "New Contact Request",
            html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message || ""}</p>
      `,
        });
        console.log(`✅ contactUsMail sent to admin`);
        return true;
    } catch (err) {
        console.error("❌ Error sending contact email:", err);
        return false;
    }
};

/**
 * Auto reply for contact form submissions
 */
const autoReplyMail = async (contact) => {
    const { firstName, lastName, email } = contact;
    if (!email) return false;

    try {
        await transporter.sendMail({
            from: `"Boxonia Blueprint" <${process.env.MAIL_USER}>`,
            to: `${firstName || ""} ${lastName || ""} <${email}>`,
            subject: `Thank You for reaching out to Boxonia Blueprint`,
            html: `
        <p>Hello <strong>${firstName || ""} ${lastName || ""}</strong>,</p>
        <p>Thank you for reaching out to Boxonia Blueprint. We’ve received your message and truly appreciate your interest.</p>
        <p>At Boxonia Blueprint, we tell exportable, authentic, and audacious African stories, rooted in Africa, made for the world.</p>
        <p>Our team is currently reviewing your inquiry and will get back to you as soon as possible.</p>
        <p>Warm regards,<br/>The Boxonia Blueprint Team</p>
      `,
        });
        console.log(`✅ autoReplyMail sent to ${email}`);
        return true;
    } catch (err) {
        console.error("❌ Error sending auto-reply:", err);
        return false;
    }
};

module.exports = {
    contactUsMail,
    autoReplyMail,
    bookTalentMail,
    autoReplyBookingMail,
};
