const request = require('supertest');

const { app } = require('../app');

let api;

beforeAll(async () => {
  await app.ready();
  api = request(app.server);
});

afterAll(async () => {
  await app.close();
});

it('sanity', async () => {
  const response = await api.get('/').set('Accept', 'application/json');
  expect(response.body).toEqual({
    message: 'Welcome to the DID Core Test Server',
  });
});
