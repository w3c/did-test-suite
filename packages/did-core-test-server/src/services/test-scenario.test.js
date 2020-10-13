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

it('should return 200 + test results for a scenario that is known', async () => {
  const response = await api
    .post('/test/scenarios')
    .set('Accept', 'application/json')
    .send(fixtures.scenarios.resolve.request);
  expect(response.status).toBe(200);
  // uncomment to align with fixtures
  // console.log(JSON.stringify(response.body));
  expect(response.body).toEqual(fixtures.scenarios.resolve.response);
});

it('should return an 400 + error results for a scenario that is NOT known', async () => {
  const response = await api
    .post('/test/scenarios')
    .set('Accept', 'application/json')
    .send(fixtures.scenarios.unknown_scenario.request);
  expect(response.status).toBe(400);
  expect(response.body).toEqual(fixtures.scenarios.unknown_scenario.response);
});
