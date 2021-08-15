'use strict';
const Joi = require(`joi`);
const {
  OfferType,
} = require(`../cli/constants`);

module.exports = Joi.object({
  title: Joi.string()
  .min(10)
  .max(100)
  .required(),

  description: Joi.string()
  .min(50)
  .max(1000)
  .required(),

  sum: Joi.number()
  .min(100)
  .required(),

  categories: Joi.array()
  .items(Joi.string())
  .min(1)
  .required(),

  type: Joi.string()
  .valid(OfferType.OFFER, OfferType.SALE)
  .required(),

  picture: Joi.string(),

  userId: Joi.number().integer().positive().required()

});
