'use strict';
const {describe, beforeAll, test, expect} = require(`@jest/globals`);

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../cli/constants`);

const {
  mockCategories,
  mockOffers
} = require(`./mocks/mock-data-for-offer`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers});
  const app = express();
  app.use(express.json());
  offer(app, new DataService(mockDB), new CommentService(mockDB));
  return app;
};


describe(`API returns a list of all offers`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
    .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 4 offers`, () => expect(response.body.length).toBe(4));

  test(`First offer's title equals "Продам советскую посуду. Почти не разбита"`, () => expect(response.body[0].title).toBe(`Продам советскую посуду. Почти не разбита`));

});

describe(`API returns an offer with given id`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
    .get(`/offers/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Продам советскую посуду. Почти не разбита"`, () => expect(response.body.title).toBe(`Продам советскую посуду. Почти не разбита`));

});

describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    categories: [`2`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф. Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .post(`/offers`)
    .send(newOffer);
  });


  test(`Status code 201`, () => {
    return expect(response.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(5))
  );

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    categories: [2],
    title: `Дам погладить котика`,
    sum: 100500,
    type: `OFFER`,
    picture: `cat.jpg`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });


  test(`Without any required property response code is 400`, () => {
    const keys = Object.keys(newOffer);
    for (const key of keys) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      request(app)
      .post(`/offers`)
      .send(badOffer)
      .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When field type is wrong response code is 400`, async () => {
    const badOffers = [
      {...newOffer, sum: true},
      {...newOffer, picture: 12345},
      {...newOffer, categories: `Котики`}
    ];
    for (const badOffer of badOffers) {
      await request(app)
      .post(`/offers`)
      .send(badOffer)
      .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When field value is wrong response code is 400`, async () => {
    const badOffers = [
      {...newOffer, sum: -1},
      {...newOffer, title: `too short`},
      {...newOffer, categories: []}
    ];
    for (const badOffer of badOffers) {
      await request(app)
      .post(`/offers`)
      .send(badOffer)
      .expect(HttpCode.BAD_REQUEST);
    }
  });

});


describe(`API changes existent offer`, () => {

  const newOffer = {
    categories: [`2`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф. Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  let app; let response;


  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .put(`/offers/2`)
    .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/2`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

describe(`API changes non-existent offer`, () => {

  const validOffer = {
    categories: [`2`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф. Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  let app; let response;


  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .put(`/offers/20`)
    .send(validOffer);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));

});

test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {

  const app = await createAPI();

  const invalidOffer = {
    categories: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
  .put(`/offers/20`)
  .send(invalidOffer)
  .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .delete(`/offers/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));


  test(`Offer count is 3 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});


test(`API refuses to delete non-existent offer`, async () => {

  const app = await createAPI();

  return request(app)
  .delete(`/offers/20`)
  .expect(HttpCode.NOT_FOUND);

});

describe(`API returns comments for given offer`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
    .get(`/offers/2/comments`);
  });

  test(`Status code 200`, () => {
    return expect(response.statusCode).toBe(HttpCode.OK);
  });


  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));

  test(`First comment's text is "Почему в таком ужасном состоянии?"`,
      () => expect(response.body[0].text).toBe(`С чем связана продажа? Почему так дешёво? Совсем немного... А сколько игр в комплекте?`));
});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .post(`/offers/2/comments`)
    .send(newComment);
  });


  test(`Status code 201`, async () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Comments count is changed`, async () => request(app)
    .get(`/offers/2/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {

  const app = await createAPI();

  return request(app)
  .post(`/offers/20/comments`)
  .send({
    text: `Неважно`
  })
  .expect(HttpCode.NOT_FOUND);

});


test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {

  const app = await createAPI();
  const comment = {};
  return request(app)
  .post(`/offers/2/comments`)
  .send(comment)
  .expect(HttpCode.BAD_REQUEST);

});


describe(`API correctly deletes a comment`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .delete(`/offers/1/comments/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/offers/1/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});


test(`API refuses to delete non-existent comment`, async () => {

  const app = await createAPI();

  return request(app)
  .delete(`/offers/2/comments/90`)
  .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent offer`, async () => {

  const app = await createAPI();

  return request(app)
  .delete(`/offers/20/comments/1`)
  .expect(HttpCode.NOT_FOUND);

});


