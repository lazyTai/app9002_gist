var Joi = require("joi");
module.exports = Joi.object().keys({
    id: Joi.number(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    group_id: Joi.number().required(),
    label_id: Joi.number().required(),
    update_time: Joi.string(),
    create_time: Joi.string(),
})