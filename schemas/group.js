var Joi = require("joi");
module.exports = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
    update_time: Joi.string(),
    create_time: Joi.string(),
})