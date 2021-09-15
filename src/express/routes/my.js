'use strict';

const {Router} = require(`express`);
const api = require(`./../api`).getAPI();
const myRouter = new Router();
const auth = require(`./../middlewares/auth`);

myRouter.get(`/`, auth, async (req, res) => {
  const {user} = req.session;
  const offers = await api.getOffers({comments: false});
  res.render(`my/my-tickets`, {offers, user});
});
myRouter.get(`/comments`, auth, async (req, res) => {
  const {user} = req.session;
  const offers = await api.getOffers({comments: true});
  res.render(`my/comments`, {offers: offers.slice(0, 3), user});
});

module.exports = myRouter;
