const router = require('express').Router();
const User = require('../models/User');
// const { registerValidation } = require('../validation');


const Joi = require('@hapi/joi');

// Register Validation
const schema = Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required(),
    password: Joi.string()
        .email()
        .min(6)
        .required()
});

router.post('/register', async (req, res) => {

    // Validate Before Create a User
    // const { error } = registerValidation(req.body);
    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].messege);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.pasword
    });

    try {
        const saveUser = await user.save();
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;