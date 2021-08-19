'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();
const api = require(`./../api`).getAPI();
const upload = require(`./../../service/middlewares/upload`);

const OFFERS_PER_PAGE = 8;

mainRouter.get(`/`, async (req, res) => {
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

  res.render(`main/main`, {offers, page, totalPages, categories});
});

mainRouter.get(`/register`, (req, res) => {
  const {error} = req.query;
  res.render(`main/sign-up`, {error});
});

mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const userData = {
    name: body[`user-name`],
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

mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
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

module.exports = mainRouter;
