const Joi = require("joi")

const schema = Joi.object({
    spice:Joi.string().required(),
    image: Joi.string().uri().required(),
    rarity: Joi.string().required(),
    commonAvailability: Joi.string().required(),
    health:Joi.string().required(),
})
module.exports = schema;