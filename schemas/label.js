var Joi = require("joi");
module.exports = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
    group_id: Joi.number(),
})