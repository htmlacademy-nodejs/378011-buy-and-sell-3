'use strict';
const userSchema = require(`../schemes/user-schema`);
const {
  HttpCode,
} = require(`../cli/constants`);


module.exports = (service) => async (req, res, next) => {
  const newUser = req.body;
  const {error} = userSchema.validate(newUser);

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
    .send(error.details.map((err) => err.message).join(`\n`));
  }
  const userByEmail = await service.findByEmail(req.body.email);

  if (userByEmail) {
    return res.status(HttpCode.BAD_REQUEST)
    .send(`Email is already in use`);
  }

  return next();
};
