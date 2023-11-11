
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
    short_description: Joi.string().required(),
    long_description: Joi.string().required()
  });
  const profileSchema =  Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName:Joi.string().required(),
    email: Joi.string().required(),
    brandName: Joi.string().required(),
    logo: Joi.string().optional(),
    mobilePhone: Joi.string().required(),
    role: Joi.string().required()
  })
  module.exports = {
    bookSchema,
    academySchema,
    profileSchema
  }