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
  let title2id = talliedResults.title2id;
  let level = 3;
  let testResultReport = recursiveRenderSection(
    section_id,
    byMethod,
    null,
    (id, key, section_number) => method2id[key],
    (key, value) => `<p>Total Implementations for ${key} : ${Object.keys(value).length}</p>`,
    level, 
    ["Suite", "Statement"],
    tr => { return `<td>${tr.suite_name}</td><td><a href="#${title2id[tr.title]}">${tr.title_clip}</a></td>`; },
    (a,b) => { // sort function
        let order1 =  a.suite.localeCompare(b.suite); // order by suite
        return order1 == 0 && a.title.localeCompare(b.title);   // then title
      }
    );

    let preamble = `
    <p>Note: Report generator shortens longer parameters and replaces them 
        with an ellipsis (\u{2026}) for readability.</p>
    `;  

  updateSection($, section_id, section_title, preamble, testResultReport);
};