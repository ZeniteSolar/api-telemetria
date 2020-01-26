const Joi = require('@hapi/joi');

// Module Validation
const registerModule = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        signature: Joi.number().required(),
    });
    return schema.validate(data);
}

// Label Validation
const registerLabel = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        date: Joi.date().required()
    });
    return schema.validate(data);
}

module.exports.registerModule = registerModule;
module.exports.registerLabel = registerLabel;