'use strict';

const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`./utils`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);
const passwordUtils = require(`../lib/password`);

const {
  DEFAULT_COUNT,
  OfferType,
  SumRestrict,
  PictureRestrict,
  Messages,
  EXIT_CODE_FAILURE,
  MAX_OFFERS_NUMBER,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_COMMENTS,
} = require(`./constants`);

const logger = getLogger({});

const readContent = async (filePath) => {
  try {
    const initialContent = await fs.readFile(filePath, `utf8`);
    const content = initialContent.trim();
    return content.split(`\n`);
  } catch (err) {
    logger.error(`${Messages.READING_ERROR} ${filePath}`);
    return process.exit(EXIT_CODE_FAILURE);
  }
};

const generateComments = (count, comments, users) => (
  Array(count).fill({}).map(() => ({
    user: users[getRandomInt(0, users.length - 1)].email,
    text: shuffle(comments)
    .slice(0, getRandomInt(1, 3))
    .join(` `),
  }))
);

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
};

const getPictureFileName = (number) => `item${(`0` + number).slice(-2)}.jpg`;

const generateOffers = (count, titles, categories, sentences, comments, users) => (
  Array(count).fill({}).map(() => ({
    user: users[getRandomInt(0, users.length - 1)].email,
    categories: getRandomSubarray(categories),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments, users),
  }))
);


module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(EXIT_CODE_FAILURE);
    }
    logger.info(`Connection to database established`);

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const users = [
      {
        name: `Иван Иванов`,
        email: `ivanov@example.com`,
        passwordHash: await passwordUtils.hash(`ivanov`),
        avatar: `avatar01.jpg`
      },
      {
        name: `Пётр Петров`,
        email: `petrov@example.com`,
        passwordHash: await passwordUtils.hash(`petrov`),
        avatar: `avatar02.jpg`
      }
    ];

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS_NUMBER) {
      console.info(logger.error(Messages.OVERMUCH));
      process.exit(EXIT_CODE_FAILURE);
    }

    const offers = generateOffers(countOffer, titles, categories, sentences, comments, users);

    initDatabase(sequelize, {offers, categories, users});

  }
};
