'use strict';

const mockCategories = [
  `Авто`,
  `Косметика и парфюмерия`,
  `Книги`,
  `Журналы`,
  `Бытовая техника`,
  `Недвижимость`,
  `Животные`,
  `Разное`,
  `Игрушки для взрослых`
];

const mockOffers = [
  {
    "user": `ivanov@example.com`,
    "categories": [
      `Авто`
    ],
    "description": `Таких предложений больше нет! Нужна зверушка, чтобы мяукала и ее можно было гладить. Некусачая. Это настоящая находка для коллекционера! Товар в отличном состоянии.`,
    "picture": `item09.jpg`,
    "title": `Продам советскую посуду. Почти не разбита`,
    "type": `OFFER`,
    "sum": 63192,
    "comments": [
      {
        "user": `petrov@example.com`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "user": `sidorov@example.com`,
        "text": `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "user": `petrov@example.com`,
        "text": `Почему в таком ужасном состоянии?`
      },
      {
        "user": `petrov@example.com`,
        "text": `А где блок питания? С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "user": `petrov@example.com`,
    "categories": [
      `Косметика и парфюмерия`,
      `Книги`,
      `Журналы`
    ],
    "description": `Нужна зверушка, чтобы мяукала и ее можно было гладить. Некусачая. Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Если найдёте дешевле — сброшу цену.`,
    "picture": `item05.jpg`,
    "title": `Куплю детские санки`,
    "type": `OFFER`,
    "sum": 15782,
    "comments": [
      {
        "user": `ivanov@example.com`,
        "text": `С чем связана продажа? Почему так дешёво? Совсем немного... А сколько игр в комплекте?`
      },
      {
        "user": `ivanov@example.com`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "user": `ivanov@example.com`,
    "categories": [
      `Бытовая техника`,
      `Косметика и парфюмерия`,
      `Недвижимость`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Возможна ипотека. Продаю с болью в сердце... Вывезу любые количества мусора с ваших глаз долой.`,
    "picture": `item15.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `OFFER`,
    "sum": 41869,
    "comments": [
      {
        "user": `petrov@example.com`,
        "text": `А сколько игр в комплекте? Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?`
      },
      {
        "user": `petrov@example.com`,
        "text": `Совсем немного...`
      }
    ]
  },
  {
    "user": `petrov@example.com`,
    "categories": [
      `Животные`,
      `Разное`,
      `Игрушки для взрослых`
    ],
    "description": `Возможна ипотека. Две страницы заляпаны свежим кофе Если товар не понравится — верну всё до последней копейки. Продаю с болью в сердце...`,
    "picture": `item01.jpg`,
    "title": `Продам коллекцию журналов «Огонёк»`,
    "type": `SALE`,
    "sum": 30388,
    "comments": [
      {
        "user": `ivanov@example.com`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.`
      }
    ]
  }
];

module.exports = {
  mockCategories,
  mockOffers
};
