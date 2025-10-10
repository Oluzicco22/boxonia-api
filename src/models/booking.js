const mongoose = require('mongoose');

const bookTalentSchema = new mongoose.Schema({
    talent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Talent',
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: [
            'feature film',
            'short film',
            'ad commercial',
            'music video',
            'brand influencing',
            'others'
        ],
        required: true
    },
    platform: {
        type: String,
        enum: ['cinema', 'netflix', 'amazon', 'youtube', "others"],
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('BookTalent', bookTalentSchema);
