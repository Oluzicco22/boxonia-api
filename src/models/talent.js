const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    info: {
        type: String,
        required: true
    },
    perks: [
        {
            type: String,
            trim: true
        }
    ],
    relatedProjects: [
        {
            type: String, // storing project URLs
            trim: true
        }
    ],
    image: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Talent', talentSchema);
