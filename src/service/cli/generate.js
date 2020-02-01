'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`./utils`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  OfferType,
  SumRestrict,
  PictureRestrict,
  CategoriesRestrict,
  Messages,
  EXIT_CODE_FAILURE,
  MAX_OFFERS_NUMBER,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
} = require(`./constants`);


const getPictureFileName = (number)=>`item${(`0` + number).slice(-2)}.jpg`;

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    categories: shuffle(categories).slice(0, getRandomInt(CategoriesRestrict.min, CategoriesRestrict.max)).join(`, `),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
);

const readContent = async (filePath) => {
  try {
    const initialContent = await fs.readFile(filePath, `utf8`);
    const content = initialContent.trim();
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(`${Messages.readingError} ${filePath}`));
    return process.exit(EXIT_CODE_FAILURE);
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS_NUMBER) {
      console.info(chalk.red(Messages.overmuch));
      process.exit(EXIT_CODE_FAILURE);
    }
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(Messages.success));
    } catch (err) {
      console.error(chalk.red(Messages.writingError));
      process.exit(EXIT_CODE_FAILURE);
    }
  }
};
