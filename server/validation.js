//VALIDATION API
const Joi = require('@hapi/joi');

function registerValidation(data) {
    const schema = Joi.object({
        FullName: Joi.string().min(6).required(),
        UserName: Joi.string().min(6).required(),
        Password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

function loginValidation(data) {
    const schema = Joi.object({
        UserName: Joi.string().min(6).required(),
        Password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
