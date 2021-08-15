'use strict';

const mockCategories = [
  `Животные`,
  `Журналы`,
  `Игры`
];


const mockOffers = [
  {
    "user": `ivanov@example.com`,
    "categories": [
      `Животные`,
      `Журналы`
    ],
    "description": `Даю недельную гарантию. Вывезу любые количества мусора с ваших глаз долой. Нужна зверушка, чтобы мяукала и ее можно было гладить. Некусачая. Возможна ипотека.`,
    "picture": `item10.jpg`,
    "title": `Куплю породистого кота`,
    "type": `SALE`,
    "sum": 97892,
    "comments": [
      {
        "user": `petrov@example.com`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "user": `petrov@example.com`,
        "text": `Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "user": `petrov@example.com`,
    "categories": [
      `Игры`
    ],
    "description": `Не пытайтесь торговаться. Цену вещам я знаю Практически неношенная. Классика. Товар в отличном состоянии. Мой дед не мог её сломать`,
    "picture": `item16.jpg`,
    "title": `Продам отличную отвертку`,
    "type": `OFFER`,
    "sum": 84843,
    "comments": [
      {
        "user": `ivanov@example.com`,
        "text": `А сколько игр в комплекте? С чем связана продажа? Почему так дешёво? А где блок питания?`
      }
    ]
  },
  {
    "user": `ivanov@example.com`,
    "categories": [
      `Животные`
    ],
    "description": `Таких предложений больше нет! Это настоящая находка для коллекционера! Бонусом отдам все аксессуары. Кому нужен этот новый телефон, если тут такое...`,
    "picture": `item07.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `SALE`,
    "sum": 47160,
    "comments": [
      {
        "user": `petrov@example.com`,
        "text": `Совсем немного... Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "user": `petrov@example.com`,
        "text": `А где блок питания? Почему в таком ужасном состоянии?`
      },
      {
        "user": `petrov@example.com`,
        "text": `А сколько игр в комплекте?`
      },
      {
        "user": `petrov@example.com`,
        "text": `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  }
];

module.exports = {
  mockCategories,
  mockOffers
};
