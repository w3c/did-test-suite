const fs = require('fs');
const getReportResults = require('./services/getReportResults');
const suitesInput = require('./suites/did-spec/default.json');

(async () => {
  const { suitesReportJson } = await getReportResults(suitesInput);

  fs.writeFileSync(
    `../../test-vectors/did-spec.latest.json`,
    JSON.stringify(suitesReportJson, null, 2)
  );
})();
