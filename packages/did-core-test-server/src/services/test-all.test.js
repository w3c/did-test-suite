const request = require('supertest');
const fs = require('fs');
const path = require('path');

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

it('should write latest fixtures to disk', async () => {
  const scenarios = [
    require('../__fixtures__/scenarios/resolve'),
    require('../__fixtures__/scenarios/did-syntax').negative,
    require('../__fixtures__/scenarios/did-syntax').positive,
    require('../__fixtures__/scenarios/did-parameters').negative,
    require('../__fixtures__/scenarios/did-parameters').positive,
    require('../__fixtures__/scenarios/json-production').positive,
  ];
  // beware that this can differ from the fixure on disk.
  // especially when changes have not be commited.
  const request = { scenarios };
  fs.writeFileSync(
    path.resolve(__dirname, '../__fixtures__/scenarios/all/request.json'),
    JSON.stringify(request, null, 2)
  );
});

it('all requests should match test fixtures', async () => {
  const response = await api
    .post('/test')
    .set('Accept', 'application/json')
    .send(fixtures.scenarios.all.request);
  // uncomment to see fixtures
  // console.log(JSON.stringify(response.body, null, 2));
  // expect(response.status).toBe(200);
  // uncomment to write fixtures to disk
  // fs.writeFileSync(
  //   path.resolve(__dirname, '../__fixtures__/scenarios/all/response.json'),
  //   JSON.stringify(response.body, null, 2)
  // );
  expect(response.body).toEqual(fixtures.scenarios.all.response);
});
