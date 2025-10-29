const contactRequest = require('../requests/contactUs');
const bookingRequest = require('../requests/bookingRequest');
const Contact = require('../models/Contact');
const { contactUsMail, autoReplyMail, bookTalentMail, autoReplyBookingMail } = require("../helpers/mailSender");
const Talent = require('../models/talent');
const BookTalent = require('../models/booking');

class IndexController {
    // ---------------- CONTACT FORM ---------------- //
    async sendContact(req, res) {
        const { error, value } = contactRequest(req.body || {});

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.details.map(err => err.message),
            });
        }

        try {
            const contact = await Contact.create({ ...value });

            // send mail to admin and auto reply to user
            await contactUsMail(contact);
            await autoReplyMail(contact);

            return res.status(200).json({
                success: true,
                message: 'Contact request submitted successfully',
            });
        } catch (err) {
            console.error("❌ Error saving contact:", err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    // ---------------- TALENT BOOKING ---------------- //
    async bookTalent(req, res) {
        const { error, value } = bookingRequest(req.body || {});

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.details.map(err => err.message),
            });
        }

        const { talent } = req.params;
        if (!talent) {
            return res.status(400).json({
                success: false,
                message: 'Talent is required in the request URL',
            });
        }

        try {
            const findTalent = await Talent.findById(talent);
            if (!findTalent) {
                return res.status(404).json({
                    success: false,
                    message: 'Talent not found',
                });
            }

            // save booking to DB
            const booking = await BookTalent.create({
                ...value,
                talent: findTalent._id,
            });

            // send mail to the specific talent
            await bookTalentMail(booking, findTalent);

            // send auto-reply to the booking user
            await autoReplyBookingMail(booking, findTalent);

            return res.status(201).json({
                success: true,
                message: 'We’ve got your booking request!',
            });
        } catch (err) {
            console.error('❌ Error saving booking:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    // ---------------- FETCH ALL TALENTS ---------------- //
    async readTalents(req, res) {
        try {
            const talents = await Talent.find({})
                .select('-createdAt -updatedAt -__v')
                .sort('createdAt');

            return res.status(200).json({
                success: true,
                message: 'Talents fetched successfully',
                data: talents,
            });
        } catch (err) {
            console.error('❌ Error fetching talents:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    // ---------------- FETCH SINGLE TALENT ---------------- //
    async readTalent(req, res) {
        const { talentId } = req.params;
        try {
            const talent = await Talent.findById(talentId)
                .select('-createdAt -updatedAt -__v');

            if (!talent) {
                return res.status(404).json({
                    success: false,
                    message: 'Talent not found',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Talent fetched successfully',
                data: talent,
            });
        } catch (err) {
            console.error('❌ Error fetching talent:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}

module.exports = IndexController;
