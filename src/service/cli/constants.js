'use strict';

const DEFAULT_COUNT = 1;

const FILE_NAME = `mock.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  `Продам коллекцию журналов «Огонёк»`,
  `Отдам в хорошие руки подшивку «Мурзилка»`,
  `Продам советскую посуду. Почти не разбита`,
  `Куплю детские санки`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе`,
  `При покупке с меня бесплатная доставка в черте города`,
  `Кажется, что это хрупкая вещь`,
  `Мой дед не мог её сломать`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

const EXIT_CODE_FAILURE = 1;

const Messages = {
  error: `Can't write data to file...`,
  success: `Operation success. File created.`,
  overmuch: `Не больше 1000 объявлений`,
};
const GENERATE_COMMAND = `--generate`;

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  TITLES,
  SENTENCES,
  CATEGORIES,
  HELP,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  MAX_OFFERS_NUMBER,
  OfferType,
  SumRestrict,
  PictureRestrict,
  EXIT_CODE_FAILURE,
  Messages,
  GENERATE_COMMAND,
};
