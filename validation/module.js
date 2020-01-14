const Joi = require('@hapi/joi');

// Register Validation
const registerModule = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        signature: Joi.number().required(),
    });
    return schema.validate(data);
}

module.exports.registerModule = registerModule;