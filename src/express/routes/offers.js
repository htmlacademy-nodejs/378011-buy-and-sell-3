'use strict';

const {Router} = require(`express`);
const upload = require(`./../../service/middlewares/upload`);
const {
  ensureArray,
} = require(`./../../service/cli/utils`);

const api = require(`./../api`).getAPI();
const offersRouter = new Router();


offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));

offersRouter.get(`/add`, async (req, res) => {
  const {error} = req.query;
  const categories = await api.getCategories();
  res.render(`offers/new-ticket`, {categories, error});
});

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const offerData = {
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: ensureArray(body.categories)
  };
  if (file) {
    offerData.picture = file.filename;
  }

  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`/offers/add?error=${encodeURIComponent(error.response.data.message)}`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`offers/ticket-edit`, {id, offer, categories, error});
});

offersRouter.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {id} = req.params;
  const offerData = {
    picture: file ? file.filename : body[`old-image`],
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: ensureArray(body.categories)
  };

  try {
    await api.editOffer(id, offerData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`/offers/edit/${id}?error=${encodeURIComponent(error.response.data.message)}`);
  }
});

offersRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const offer = await api.getOffer(id, true);
  res.render(`offers/ticket`, {offer, error});
});

offersRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const offer = await api.getOffer(id, true);
  res.render(`offers/ticket`, {offer, id, error});
});

offersRouter.post(`/:id/comments`, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;

  try {
    await api.createComment(id, {text: comment});
    res.redirect(`/offers/${id}`);
  } catch (error) {
    res.redirect(`/offers/${id}?error=${encodeURIComponent(error.response.data.message)}`);
  }
});

module.exports = offersRouter;
