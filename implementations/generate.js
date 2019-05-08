/**
 * Generates the HTTP Signatures Implementation Report given
 * a set of *-report.json files.
 */
const fs = require('fs');
const path = require('path');
const testConfig = require('./test.json');

// extract the results from all of the test files
const allTests = [];
const allResults = {};
const dirContents = fs.readdirSync(__dirname);
const files = dirContents.filter(
  contents => {return contents.match(/.*-report.json/ig);});

if(!files.length) {
  throw new Error(
    'Failed to find any reports in the form of your_program-report.json ' +
    `in the dir ${__dirname}`);
}

function getTestStatus(test, pendingTitles) {
  if(pendingTitles.includes(test.fullTitle)) {
    return 'skipped';
  }
  const errorCount = Object.keys(test.err).length;
  if(errorCount > 0) {
    return 'failure';
  }
  return 'success';
}

// process each test file
files.forEach(file => {
  const implementation = file.match(/(.*)-report.json/)[1];
  const results = JSON.parse(fs.readFileSync(
    path.join(__dirname, file)), 'utf-8');
  allResults[implementation] = {};
  const pendingTitles = results.pending.map(t => t.fullTitle);

  // process each test, noting the result
  results.tests.forEach(test => {
    allResults[implementation][test.fullTitle] =
      getTestStatus(test, pendingTitles);
    // assume vc.js tests all features
    // TODO abstract this out
    if(implementation === testConfig.implementation) {
      allTests.push(test.fullTitle);
    }
  });
});

// generate the implementation report
const implementations = Object.keys(allResults).sort();
let conformanceTable = `
<table class="simple">
  <thead>
    <th width="80%">Test</th>
`;
implementations.forEach(implementation => {
  conformanceTable += `<th>${implementation}</th>`;
});
conformanceTable += `
  </thead>
  <tbody>
`;

// process each test
allTests.forEach(test => {
  conformanceTable += `
    <tr>
      <td>${test}</td>
  `;
  implementations.forEach(implementation => {
    const status = (allResults[implementation][test]) || 'unimplemented';
    let statusMark = '-';

    if(status === 'success') {
      statusMark = '✓';
    }
    if(status === 'failure') {
      statusMark = '❌';
    }
    if(status === 'skipped') {
      //skipped tests get a pause button
      statusMark = '&#9208;';
    }

    conformanceTable += `
      <td class="${status}">${statusMark}</td>
    `;
  });
  conformanceTable += `
    </tr>
  `;
});
conformanceTable += `
  </tbody>
</table>
`;

// output the implementation report
const template = fs.readFileSync(
  path.join(__dirname, 'template.html'), 'utf-8');
fs.writeFileSync(path.join(__dirname, 'index.html'),
  template.replace('%%%REPORTS%%%', conformanceTable));

console.log('Generated new implementation report.');
