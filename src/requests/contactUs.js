const Joi = require('joi');

const contactRequest = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'First name is required',
                'string.min': 'First name must be at least 2 characters',
                'string.max': 'First name must not be more than 50 characters',
            }),

        lastName: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'Last name is required',
                'string.min': 'Last name must be at least 2 characters',
                'string.max': 'Last name must not be more than 50 characters',
            }),

        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
            }),

        message: Joi.string()
            .min(10)
            .max(1000)
            .required()
            .messages({
                'string.empty': 'Message is required',
                'string.min': 'Message must be at least 10 characters',
                'string.max': 'Message must not be more than 1000 characters',
            }),
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = contactRequest;
