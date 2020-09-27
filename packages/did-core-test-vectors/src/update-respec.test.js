const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const moment = require('moment');

const request = require('supertest');
const { app, allScenarios } = require('did-core-test-server');

let api;

// expect 'YES' / 'NO'
const UPDATE_RESPEC_TEST_REPORT = process.env.UPDATE_RESPEC_TEST_REPORT;

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
    .send(allScenarios.request);
  expect(response.status).toBe(200);
  // Uncomment to capture fixture
  // console.log(JSON.stringify(response.body, null, 2));
  expect(response.body).toEqual(allScenarios.response);
  results = response.body;
});

it('should update respec', async () => {
  const respecPath = path.resolve(__dirname, '../../../index.html');
  if (UPDATE_RESPEC_TEST_REPORT === 'YES' && results) {
    const spec = fs.readFileSync(respecPath).toString();
    const $ = cheerio.load(spec);

    $('#all-scenarios-request-json').replaceWith(
      `<script type="application/json" id="all-scenarios-request-json">
${JSON.stringify(allScenarios.request, null, 2)}
      </script>`
    );

    $('#all-scenarios-response-json').replaceWith(
      `<script type="application/json" id="all-scenarios-response-json">
${JSON.stringify(results, null, 2)}
      </script>`
    );

    $('#raw-rest-results-last-updated').replaceWith(
      `<p id="raw-rest-results-last-updated" class="note">
These test results were last generated 
<span id="raw-rest-results-last-updated-date">
${moment().format('LLLL')}
</span>
      </p>`
    );

    const updatedSpec = $.html();
    fs.writeFileSync(respecPath, updatedSpec);
  }
});
