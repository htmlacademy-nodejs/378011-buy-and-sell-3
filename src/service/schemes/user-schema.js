'use strict';
const Joi = require(`joi`);

module.exports = Joi.object({
  name: Joi.string().pattern(/[^0-9$&+,:;=?@#|'<>.^*()%!]+/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordRepeated: Joi.string().required().valid(Joi.ref(`password`)),
  avatar: Joi.string().required()
});
