const fs = require('fs');
const path = require('path');

const getReportResults = require('../services/getReportResults');
const systemSuitesConfig = require('../suites/suite-config.js');

let temp_dir = path.resolve(__dirname, './tmp');
if (!fs.existsSync(temp_dir)) {
    fs.mkdirSync(temp_dir);
}

(async () => {
  const report = await getReportResults(systemSuitesConfig);

  fs.writeFileSync(
    `${temp_dir}/did-spec-test-run.latest.json`,
    JSON.stringify(report.suitesReportJson, null, 2)
  );
})();
