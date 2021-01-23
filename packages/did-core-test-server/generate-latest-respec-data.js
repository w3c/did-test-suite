const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const moment = require('moment');
const getReportResults = require('./services/getReportResults');
const suitesInput = require('./suites/did-spec/default.json');

const respecPath = path.resolve(__dirname, '../../index.html');

const updateRespec = (suitesInput, suitesReportJson) => {
  const spec = fs.readFileSync(respecPath).toString();
  const $ = cheerio.load(spec);

  $('#did-spec-suite-input').replaceWith(
    `<pre
        id="did-spec-suite-input"
        class="example"
        title="did-spec latest input report"
      >
${JSON.stringify(suitesInput, null, 2)}
      </pre>`
  );

  $('#did-spec-suite-output').replaceWith(
    `<pre
        id="did-spec-suite-output"
        class="example"
        title="did-spec latest output report"
      >
${JSON.stringify(suitesReportJson, null, 2)}
      </pre>`
  );

  $('#did-spec-report-date').replaceWith(
    `<p id="did-spec-report-date" class="note">
These test results were last generated 
<span>
${moment().format('LLLL')}
</span>
      </p>`
  );

  const updatedSpec = $.html();
  fs.writeFileSync(respecPath, updatedSpec);
};

(async () => {
  const { suitesReportJson } = await getReportResults(suitesInput);
  updateRespec(suitesInput, suitesReportJson);
  fs.writeFileSync(
    `../../test-vectors/did-spec.latest.json`,
    JSON.stringify(suitesReportJson, null, 2)
  );
})();
