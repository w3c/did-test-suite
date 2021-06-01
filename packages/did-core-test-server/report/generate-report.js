const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const tallyResults = require("./report-generator/tallyResults");
const updateReportMetaInformation = require("./report-generator/updateReportMetaInformation");
const generateDetailedReportBySuites = require("./report-generator/generateDetailedReportBySuites");
const generateDetailedReportByMethods = require("./report-generator/generateDetailedReportByMethods");
const generateImplementationSummary = require("./report-generator/generateImplementationSummary");
const generateSpecStatementSummary = require("./report-generator/generateSpecStatementSummary");

const latestResults = require('./tmp/did-spec-test-run.latest.json');
const talliedResults = tallyResults(latestResults);
const systemSuitesConfig = require('../suites/suite-config.js');

const reportTemplate = path.resolve(__dirname, './report-template.html');
const reportOutput = path.resolve(__dirname, './index.html');

(async () => {
  const spec = fs.readFileSync(reportTemplate).toString();
  const $ = cheerio.load(spec);

  updateReportMetaInformation($, systemSuitesConfig);

  generateImplementationSummary($, talliedResults);
  generateSpecStatementSummary($, talliedResults);
  generateDetailedReportBySuites($, talliedResults);
  generateDetailedReportByMethods($, talliedResults);

  const updatedSpec = $.html();
  fs.writeFileSync(reportOutput, updatedSpec);

})();
