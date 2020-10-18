'use strict';
const {nanoid} = require(`nanoid`);
const {
  MAX_ID_LENGTH,
} = require(`../cli/constants`);

class CommentService {
  findAll(offer) {
    return offer.comments;
  }

  delete(offer, commentId) {
    const deletedComment = offer.comments
    .find((item) => item.id === commentId);

    if (!deletedComment) {
      return null;
    }
    offer.comments.filter((comment)=>comment.id !== commentId);

    return deletedComment;
  }

  create(offer, comment) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
    }, comment);

    offer.comments.push(newComment);
    return comment;
  }

}

module.exports = CommentService;
