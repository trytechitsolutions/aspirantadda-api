
const Joi = require('joi');
const bookSchema = Joi.object({
    title: Joi.string().min(4).required(),
    category: Joi.number().required(),
    publisher: Joi.number().required(),
    mrpPrice: Joi.string().required(),
    medium: Joi.string().min(4).required(),
    author: Joi.string().min(4).required(),
    count: Joi.number(),
    edition: Joi.number(),
  });
  const academySchema = Joi.object({
    name: Joi.string().required(),
    shortDescription: Joi.string().required(),
    longDescription: Joi.string().required()
  });
  module.exports = {
    bookSchema,
    academySchema
  }