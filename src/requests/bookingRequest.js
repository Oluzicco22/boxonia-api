const Joi = require('joi');

const bookingRequest = (data) => {
    const schema = Joi.object({
        type: Joi.string()
            .valid('feature film', 'short film', 'ad commercial', 'music video', 'brand influencing', 'others')
            .required()
            .messages({
                'any.only': 'Type must be one of: feature film, short film, ad commercial, music video, brand influencing, others',
                'string.empty': 'Type is required',
            }),

        platform: Joi.string()
            .valid('cinema', 'netflix', 'amazon', 'youtube')
            .required()
            .messages({
                'any.only': 'Platform must be one of: cinema, netflix, amazon, youtube',
                'string.empty': 'Platform is required',
            }),

        synopsis: Joi.string()
            .min(3)
            .required()
            .messages({
                'string.empty': 'Synopsis is required',
                'string.min': 'Synopsis must be at least 3 characters long',
            }),

        duration: Joi.string()
            .required()
            .messages({
                'string.empty': 'Duration is required',
            }),

        payment: Joi.string()
            .required()
            .messages({
                'string.empty': 'Payment is required',
            }),
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = bookingRequest;
