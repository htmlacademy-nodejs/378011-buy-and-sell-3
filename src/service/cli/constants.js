'use strict';

module.exports.DEFAULT_COUNT = 1;

module.exports.FILE_NAME = `mock.json`;

module.exports.TITLES = [
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

module.exports.SENTENCES = [
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

module.exports.CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

module.exports.HELP = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>
    
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json`;

module.exports.USER_ARGV_INDEX = 2;

module.exports.DEFAULT_COMMAND = `--help`;

module.exports.MAX_OFFERS_NUMBER = 1000;

module.exports.OfferType = {
  offer: `offer`,
  sale: `sale`,
};

module.exports.SumRestrict = {
  min: 1000,
  max: 100000,
};

module.exports.PictureRestrict = {
  min: 1,
  max: 16,
};

module.exports.ExitCode = {
  success: 0,
  failure: 1,
};

module.exports.Messages = {
  error: `Can't write data to file...`,
  success: `Operation success. File created.`,
  overmuch: `Не больше 1000 объявлений`,
};
