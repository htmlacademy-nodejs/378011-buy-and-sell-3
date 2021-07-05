'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../cli/constants`);
const schemeValidator = require(`../middlewares/scheme-validator`);
const offerExist = require(`../middlewares/offer-exist`);
const offerSchema = require(`../schemes/offer-schema`);
const commentSchema = require(`../schemes/comment-schema`);
const routeParamsValidator = require(`../middlewares/route-params-validator`);


module.exports = (app, offerService, commentService) => {
  const route = new Router();

  app.use(`/offers`, route);
  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;
    if (limit || offset) {
      result = await offerService.findPage({limit, offset});
    } else {
      result = await offerService.findAll(comments);
    }
    res.status(HttpCode.OK).json(result);
  });

  route.get(`/:offerId`, routeParamsValidator, async (req, res) => {
    const {offerId} = req.params;
    const {comments} = req.query;
    const offer = await offerService.findOne(offerId, comments);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
    .json(offer);
  });

  route.post(`/`, schemeValidator(offerSchema), async (req, res) => {
    const offer = await offerService.create(req.body);
    return res.status(HttpCode.CREATED)
    .json(offer);
  });

  route.put(`/:offerId`, [routeParamsValidator, schemeValidator(offerSchema)], async (req, res) => {
    const {offerId} = req.params;

    const updated = await offerService.update(offerId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }
    return res.status(HttpCode.OK)
    .send(`Updated`);
  });

  route.delete(`/:offerId`, [routeParamsValidator, offerExist(offerService)], async (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = await offerService.delete(offerId);

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND)
      .json(deletedOffer);
    }

    return res.status(HttpCode.OK)
    .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, [routeParamsValidator, offerExist(offerService)], async (req, res) => {
    const {offerId} = req.params;
    const comments = await commentService.findAll(offerId);

    return res.status(HttpCode.OK)
   .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, [routeParamsValidator, offerExist(offerService)], async (req, res) => {
    const {commentId} = req.params;
    const deleted = await commentService.delete(commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found`);
    }

    return res.status(HttpCode.OK)
    .json(deleted);
  });

  route.post(`/:offerId/comments`, [routeParamsValidator, offerExist(offerService), schemeValidator(commentSchema)], (req, res) => {
    const {offerId} = req.params;
    const comment = commentService.create(offerId, req.body);

    return res.status(HttpCode.CREATED)
    .json(comment);
  });


};
