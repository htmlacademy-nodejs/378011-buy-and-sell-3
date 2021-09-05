'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();
const api = require(`./../api`).getAPI();
const upload = require(`./../../service/middlewares/upload`);

const OFFERS_PER_PAGE = 8;

mainRouter.get(`/`, async (req, res) => {
  const {user} = req.session;
  let {page = 1} = req.query;
  page = +page;

  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const [
    {count, offers},
    categories
  ] = await Promise.all([
    api.getOffers({limit, offset}),
    api.getCategories(true)
  ]);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  res.render(`main/main`, {offers, page, user, totalPages, categories});
});

mainRouter.get(`/register`, (req, res) => {
  const {error} = req.query;
  res.render(`main/sign-up`, {error});
});

mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const userData = {
    name: `${body[`user-name`]}`,
    email: body[`user-email`],
    avatar: ``,
    password: body[`user-password`],
    passwordRepeated: body[`user-password-again`]
  };
  if (file) {
    userData.avatar = file.filename;
  }
  try {
    await api.createUser(userData);
    res.redirect(`/login`);
  } catch (error) {
    res.redirect(`/register?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRouter.get(`/login`, (req, res) => {
  const {error} = req.query;
  res.render(`main/login`, {error});
});


mainRouter.post(`/login`, async (req, res) => {
  try {
    const user = await api.auth(req.body[`user-email`], req.body[`user-password`]);
    req.session.user = user;
    res.redirect(`/`);
  } catch (error) {
    res.redirect(`/login?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);

    res.render(`main/search-result`, {
      results
    });
  } catch (error) {
    res.render(`main/search-result`, {
      results: []
    });
  }
});

mainRouter.get(`/logout`, (req, res) => {
  delete req.session.user;
  res.redirect(`/`);
});

module.exports = mainRouter;
