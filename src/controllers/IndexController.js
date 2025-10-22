const contactRequest = require('../requests/contactUs');
const bookingRequest = require('../requests/bookingRequest');
const Contact = require('../models/Contact');
const {contactUsMail, autoReplyMail, bookTalentMail} = require("../helpers/mailSender");
const Talent = require('../models/talent');
const BookTalent = require('../models/booking');

class IndexController {

    async sendContact(req, res){
        const { error, value } = contactRequest(req.body || {});

        if(error){
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.details.map(err => err.message),
            });
        }

        try{
            const contact = await Contact.create({...value});
            contactUsMail(contact);
            autoReplyMail(contact);

            return res.status(200).json({
                success: true,
                message: 'Contact request submitted successfully'
            });
        }catch(err){
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    async bookTalent(req, res){
        const { error, value } = bookingRequest(req.body || {});

        if(error){
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

            const booking = await BookTalent.create({
                ...value,
                talent: findTalent._id
            });
            bookTalentMail(booking, findTalent)

            return res.status(201).json({
                success: true,
                message: 'Talent booked successfully'
            });
        } catch (err) {
            console.error('Error saving booking:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    async readTalents(req, res) {
        try {
            const talents = await Talent.find({}).select('-createdAt -updatedAt -__v');

            return res.status(200).json({
                success: true,
                message: 'Talents fetched successfully',
                data: talents,
            });
        } catch (err) {
            console.error('Error fetching talents:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    async readTalent(req, res) {
        const { talentId } = req.params;
        try {
            const talent = await Talent.findById(talentId).select('-createdAt -updatedAt -__v');

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
            console.error('Error fetching talent:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}

module.exports = IndexController;
