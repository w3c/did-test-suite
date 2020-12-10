const request = require('supertest');

const { app } = require('../../../app');

const fixture = require('../../../__fixtures__').scenarios['did-syntax']
  .positive;
let api;

beforeAll(async () => {
  await app.ready();
  api = request(app.server);
});

afterAll(async () => {
  await app.close();
});

it('should should match test fixture expectations', async () => {
  const response = await api
    .post('/test/scenarios')
    .set('Accept', 'application/json')
    .send(fixture.request);
  // uncomment to align with fixtures
  // console.log(JSON.stringify(response.body, null, 2));
  expect(response.status).toBe(200);
  expect(response.body).toEqual(fixture.response);
});
