const Joi = require('joi');

const contactRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'name is required',
                'string.min': 'name must be at least 2 characters',
                'string.max': 'name must not be more than 50 characters',
            }),

        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.empty': 'email is required',
                'string.email': 'email must be a valid email address',
            }),

        subject: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'subject is required',
                'string.min': 'subject must be at least 3 characters',
                'string.max': 'subject must not be more than 100 characters',
            }),

        message: Joi.string()
            .min(10)
            .max(1000)
            .optional()
            .allow('')
            .messages({
                'string.min': 'message must be at least 10 characters',
                'string.max': 'message must not be more than 1000 characters',
            }),
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = contactRequest;
