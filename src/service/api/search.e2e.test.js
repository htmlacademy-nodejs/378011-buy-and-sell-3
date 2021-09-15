
'use strict';
const {describe, beforeAll, test, expect} = require(`@jest/globals`);

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../cli/constants`);

const {
  mockCategories,
  mockOffers
} = require(`./mocks/mock-data-for-search`);

const {
  mockUsers
} = require(`./mocks/mock-users`);

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());


beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers, users: mockUsers});
  search(app, new DataService(mockDB));
});


describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
    .get(`/search`)
    .query({
      query: `Продам коллекцию журналов «Огонёк»`
    });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(2));
  test(`Offer has correct title`, () => expect(response.body[0].title).toBe(`Продам коллекцию журналов «Огонёк»`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
  .get(`/search`)
  .query({
    query: `Продам свою душу`
  })
  .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
  .get(`/search`)
  .expect(HttpCode.BAD_REQUEST)
);
