const recursiveRenderSection = require("./recursiveRenderSection");
const updateSection = require("./updateSection");

module.exports = generateDetailedReportBySuites = ($, talliedResults) => {
  let section_id = 'report-by-test-suites';
  let section_title = 'Report by Test Suites';

  if (!talliedResults) {
    updateSection($, section_id, section_title, '');
    return;
  }
  let bySuite = talliedResults.bySuite;
  let title2id = talliedResults.title2id;

  let level = 3;
  let testResultReport = recursiveRenderSection(
    section_id,
    bySuite,
    title2id,
    (id, key, section_number) => `${id}-${key}`,
    (key, value) => "",
    level, ["Method", "Implementation"],
    tr => `<td>${tr.did_method}</td><td>${tr.implementation}</td>`
    );

  let preamble = `
  <p>Note: Report generator shortens longer parameters and replaces them 
      with an ellipsis (\u{2026}) for readability.</p>
  `;

  updateSection($, section_id, section_title, preamble, testResultReport);
};
