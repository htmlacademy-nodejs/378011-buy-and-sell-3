'use strict';

const DEFAULT_COUNT = 1;

const FILE_NAME = `mock.json`;

const HELP = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>
    
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json`;

const USER_ARGV_INDEX = 2;

const DEFAULT_COMMAND = `--help`;

const MAX_OFFERS_NUMBER = 1000;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

const CategoriesRestrict = {
  min: 1,
  max: 3,
};

const EXIT_CODE_FAILURE = 1;

const Messages = {
  writingError: `Can't write data to file...`,
  readingError: `Can't read data from file`,
  success: `Operation success. File created.`,
  overmuch: `Не больше 1000 объявлений`,
};
const GENERATE_COMMAND = `--generate`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  HELP,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  MAX_OFFERS_NUMBER,
  OfferType,
  SumRestrict,
  PictureRestrict,
  CategoriesRestrict,
  EXIT_CODE_FAILURE,
  Messages,
  GENERATE_COMMAND,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
};
