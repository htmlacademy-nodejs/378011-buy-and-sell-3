'use strict';
const {describe, beforeAll, test, expect} = require(`@jest/globals`);

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../cli/constants`);

const mockData = require(`./mocks/mockDataForOffer`);


const createAPI = () => {
  const app = express();
  const clonedData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(clonedData), new CommentService());
  return app;
};


describe(`API returns a list of all offers`, () => {


  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
    .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 4 offers`, () => expect(response.body.length).toBe(4));

  test(`First offer's id equals "5GNIT6"`, () => expect(response.body[0].id).toBe(`5GNIT6`));

});

describe(`API returns an offer with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
    .get(`/offers/5GNIT6`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Продам советскую посуду. Почти не разбита"`, () => expect(response.body.title).toBe(`Продам советскую посуду. Почти не разбита`));

});

describe(`API returns 404 when asked for non existed id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
    .get(`/offers/5GIT6`);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));

});


describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
    .post(`/offers`)
    .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(5))
  );

});


describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
      .post(`/offers`)
      .send(badOffer)
      .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
    .put(`/offers/5GNIT6`)
    .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/5GNIT6`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});


test(`API returns status code 404 when trying to change non-existent offer`, () => {

  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});


test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
  .put(`/offers/NOEXST`)
  .send(invalidOffer)
  .expect(HttpCode.BAD_REQUEST);
});
describe(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
    .delete(`/offers/5GNIT6`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`5GNIT6`));

  test(`Offer count is 3 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(3))
  );


});

test(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app)
  .delete(`/offers/NOEXST`)
  .expect(HttpCode.NOT_FOUND);

});

describe(`API returns comments for given offer id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
    .get(`/offers/5GNIT6/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));


  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(4));


});

describe(`API creates a comment to existent offer and returns status code 201`, () => {

  const app = createAPI();

  let response;

  const newComment = {
    text: `Комментарий`
  };

  beforeAll(async () => {
    response = await request(app)
    .post(`/offers/5GNIT6/comments`)
    .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));


  test(`Comment count is 5 now`, () => request(app)
    .get(`/offers/5GNIT6/comments`)
    .expect((res) => expect(res.body.length).toBe(5))
  );

});


test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
  .post(`/offers/NOEXST/comments`)
  .send({
    text: `Неважно`
  })
  .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
  .post(`/offers/5GNIT6/comments`)
  .send({})
  .expect(HttpCode.BAD_REQUEST);

});


describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
    .delete(`/offers/5GNIT6/comments/L9WWQH`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`L9WWQH`));

});


test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
  .delete(`/offers/GxdTgz/comments/NOEXST`)
  .expect(HttpCode.NOT_FOUND);

});


test(`API refuses to delete a comment to non-existent offer`, () => {

  const app = createAPI();

  return request(app)
  .delete(`/offers/NOEXST/comments/NOEXST`)
  .expect(HttpCode.NOT_FOUND);

});


