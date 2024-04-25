const joi = require("joi");

exports.AddProductValidation = joi.object({
  name: joi.string().required(),
  quantity: joi.string().required(),
  price: joi.string().required(),
  category_id: joi.number().required(),
  // user_id: joi.string().required(),
});
