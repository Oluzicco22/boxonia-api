const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name must not be more than 50 characters'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            minlength: [3, 'Subject must be at least 3 characters'],
            trim: true,
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
