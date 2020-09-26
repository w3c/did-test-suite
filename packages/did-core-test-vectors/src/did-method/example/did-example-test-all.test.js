const request = require('supertest');
const { app } = require('did-core-test-server');

const { example } = require('../../__fixtures__');
let api;

beforeAll(async () => {
  await app.ready();
  api = request(app.server);
});

afterAll(async () => {
  await app.close();
});

it('did key should pass all tests', async () => {
  const response = await api
    .post('/test')
    .set('Accept', 'application/json')
    .send(example.request);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(example.response);
});
