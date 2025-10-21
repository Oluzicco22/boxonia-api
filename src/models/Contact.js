const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
            minlength: [2, 'First Name must be at least 2 characters'],
            maxlength: [50, 'First Name must not be more than 50 characters'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
            minlength: [2, 'Last Name must be at least 2 characters'],
            maxlength: [50, 'Last Name must not be more than 50 characters'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
        },
        message: {
            type: String,
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [1000, 'Message must not be more than 1000 characters'],
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
