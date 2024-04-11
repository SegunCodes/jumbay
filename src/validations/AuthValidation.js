const joi = require("joi")

exports.RegisterValidation = joi.object({
    email: joi.string().email().required(),
    usertype: joi.string().valid('buyer', 'seller').required(),
    password: joi.string().required()
})