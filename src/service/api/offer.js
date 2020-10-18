'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../cli/constants`);
const offerValidator = require(`../middlewares/offerValidator`);
const offerExist = require(`../middlewares/offerExist`);
const commentValidator = require(`../middlewares/commentValidator`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const offers = await offerService.findAll();
    res.status(HttpCode.OK)
    .json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
    .json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
    .json(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }
    const updatedOffer = offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
    .json(updatedOffer);
  });

  route.delete(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.delete(offerId);

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found`);
    }

    return res.status(HttpCode.OK)
    .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res.status(HttpCode.OK)
   .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;
    const deletedComment = commentService.delete(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found`);
    }

    return res.status(HttpCode.OK)
    .json(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED)
    .json(comment);
  });


};