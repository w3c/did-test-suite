const request = require('supertest');

const { app } = require('../app');

const fixtures = require('../__fixtures__');

let api;

beforeAll(async () => {
  await app.ready();
  api = request(app.server);
});

afterAll(async () => {
  await app.close();
});

it('should return 200 + test results for all scenarios', async () => {
  // console.log(JSON.stringify(fixtures.scenarios.all.request));
  const response = await api
    .post('/test')
    .set('Accept', 'application/json')
    .send(fixtures.scenarios.all.request);
  // console.log(JSON.stringify(response.body));
  expect(response.status).toBe(200);
  // uncomment to align with fixtures
  expect(response.body).toEqual(fixtures.scenarios.all.response);
});
