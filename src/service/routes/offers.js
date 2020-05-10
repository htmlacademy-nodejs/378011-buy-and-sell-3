'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const {
  FILENAME,
} = require(`./../cli/constants`);

const offersRouter = new Router();


offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.json([]);
  }
});

module.exports = offersRouter;
