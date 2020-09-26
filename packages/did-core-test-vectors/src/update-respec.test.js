const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const request = require('supertest');
const { app } = require('did-core-test-server');

const { example } = require('./__fixtures__');
let api;

const UPDATE_RESPEC = process.env.UPDATE_RESPEC; // expect 'YES' / 'NO'

beforeAll(async () => {
  await app.ready();
  api = request(app.server);
});

afterAll(async () => {
  await app.close();
});

let results;

it('should run all tests', async () => {
  const response = await api
    .post('/test')
    .set('Accept', 'application/json')
    .send(example.request);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(example.response);
  results = response.body;
});

it('should update respec', async () => {
  const respecPath = path.resolve(__dirname, '../../../index.html');
  if (UPDATE_RESPEC === 'YES' && results) {
    const spec = fs.readFileSync(respecPath).toString();
    const $ = cheerio.load(spec);
    $('#test-results-raw-json').replaceWith(
      `<script type="application/json" id="test-results-raw-json">
${JSON.stringify(results, null, 2)}
      </script>`
    );
    const updatedSpec = $.html();
    fs.writeFileSync(respecPath, updatedSpec);
  }
});
