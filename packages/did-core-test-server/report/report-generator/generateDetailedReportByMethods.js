const recursiveRenderSection = require("./recursiveRenderSection");
const updateSection = require("./updateSection");

module.exports = generateDetailedReportsummaryByMethod = ($, talliedResults) => {
  let section_id = 'report-by-methods';
  let section_title = 'Report by Methods';

  if (!talliedResults) {
    updateSection($, section_id, section_title, '');
    return;
  }
  let byMethod = talliedResults.byMethod;
  let method2id = talliedResults.method2id;
  let level = 3;
  let testResultReport = recursiveRenderSection(
    section_id,
    byMethod,
    (id, key, section_number) => method2id[key],
    (key, value) => `<p>Total Implementations for ${key} : ${Object.keys(value).length}</p>`,
    level, 
    ["Suite"],
    tr => { return `<td>${tr.suite_name}</td>`; }
    );

  updateSection($, section_id, section_title, testResultReport);
};