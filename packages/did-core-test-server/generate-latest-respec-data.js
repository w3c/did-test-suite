const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const moment = require('moment');
const getReportResults = require('./services/getReportResults');

const systemSuitesConfig = require('./suites/suite-config.js');

const respecPath = path.resolve(__dirname, '../../index.html');

const resultToEmoji = (test) => {
  switch (test) {
    case 'passed': return `✅`;
    case 'failed' : return `❌`;
    default: return `⚠️`;
  };
};

const renderReportResults = ($, results) => {
  let flattenMethodResults = {};
  let by_suite = {};
  // let by_method = {};

  results.forEach((r) => { r.testResults.forEach((tr) => {
    let ancestors = [...tr.ancestors];
    let suite_name = ancestors.shift().match(/^suites\/(.*)$/)[1];
    let method_name = ancestors.shift().match(/^IMPLEMENTATION ::(.*)::$/)[1];
    let ancestorsWithoutMethod = ancestors;
    let did = ancestors.find( a => a.match(/^did:/) );
    let parameters = [ did,
                       ...(ancestors.filter( a => a.match(/^PARAMETER (.*)/)) || []).map( a => a.replace(/PARAMETER /, '')),
                       ...(ancestors.filter( a => a.match(/^application\//)) || []) ];
    let testAncestorsWithoutMethod = ancestorsWithoutMethod.join(' > ');
    let testKey = [suite_name, tr.title].join(' > ');
    let didMethodTestResult = {
      status: tr.status,
      method: method_name,
      suite_name: suite_name,
      did: did,
      parameters: parameters
    };

    if (!by_suite[suite_name]) {
      by_suite[suite_name] = {};
      by_suite[suite_name][tr.title] = [ didMethodTestResult ]
    }
    else {
      if (!by_suite[suite_name][tr.title]) {
        by_suite[suite_name][tr.title] = [];
      }
      by_suite[suite_name][tr.title].push(didMethodTestResult);
    }

    // if (!by_method[method_name]) {
    //   by_method[method_name] = {};
    //   by_method[method_name][suite_name] = [ didMethodTestResult ];
    // }
    // else {
    //   if (!by_method[method_name][suite_name]) {
    //     by_method[method_name][suite_name] = [];
    //   }
    //   by_method[method_name][suite_name].push(didMethodTestResult);
    // }

    if (!flattenMethodResults[testKey]) {
      flattenMethodResults[testKey] = {
        ancestorsWithoutMethod: ancestorsWithoutMethod.splice(1),
        suite_name: suite_name,
        title: tr.title,
        didMethods: [didMethodTestResult]
      };
    } else {
      flattenMethodResults[testKey].didMethods.push(didMethodTestResult);
    }
  }); });

  const resultsSorted = Object.values(flattenMethodResults).sort((a, b) => {
    return a.ancestorsWithoutMethod.join(' > ') >
      b.ancestorsWithoutMethod.join(' > ')
      ? 1
      : -1;
  });

  const recursiveRenderSection = (id, section, level) => {
    let result = '';
    let section_number = 1;
    if (section && id && Object.keys(section).length) {
      result = `

    ${Object.keys(section)
      .map((key) => {
        const value = section[key];
        const subSection = recursiveRenderSection(null, value, level + 1);
        return `
<section id="${id}-${section_number++}">
<h${level}>${key}</h${level}>
${subSection}
</section>
    `;
      })
      .join('\n')}

              `;
    } else {
      result = Object.keys(section)
        .map((statement) => {
          const count = section[statement]
            .map((test) => {
              return {
                status: test.status === 'passed' ? 'passed' : ( test.status === 'failed' ? 'failed' : 'todo'),
              };
            })
            .reduce((tally, test) => {
              if (!tally[test.status]) {
                tally[test.status] = 1;
              } else {
                tally[test.status] = tally[test.status] + 1;
              }
              return tally;
            }, {});
          const resultTable = `
<table class="simple" >
<tbody>
<tr>
<th style="width: 10%;"> ${count.failed ? resultToEmoji('failed') + ` (${count.failed})` : ''}
${(count.failed && count.passed) ? `<br/>` : ''}
${count.passed ? resultToEmoji('passed') + ` (${count.passed})` : ''} 
${(count.todo && count.todo) ? `<br/>` : ''}
${count.todo ? resultToEmoji('todo') + ` (${count.todo})` : ''} 
</th>
<th style="width: 30%">Method</th>
<th style="width: 70%">Parameters</th>
</tr>
${section[statement]
  .map((tr) => {
    return `
<tr>
<td>${resultToEmoji(tr.status)}</td>
<td>${tr.method}</td>
<td>${tr.parameters.join(', ')}</td>
</tr>
`;
  })
  .join('\n')}
</table>
`;

          return `
<div>
<p>${statement}</p>
${resultTable}
</div>
`;
        })
        .join('\n');
    }

    return result;
  };

  let level = 3;
  let target = 'conformance-by-test-suites';
  let testResultReport = recursiveRenderSection(target, by_suite, level);
  $(`#${target}`).replaceWith(`
  <section id="${target}">
  <h2>Conformance by Test Suites</h2>
  ${testResultReport}
  </section>

  `);
};

const updateRespec = (systemSuitesConfig, suitesReportJson, suitesReportTerminal) => {
  const spec = fs.readFileSync(respecPath).toString();
  const $ = cheerio.load(spec);

  renderReportResults($, suitesReportJson);

  $('#did-spec-suite-configuration').replaceWith(
    `<pre
        id="did-spec-suite-configuration"
        class="example"
        title="The current did-spec configuration file"
      >
${JSON.stringify(systemSuitesConfig, null, 2)}
      </pre>`
  );

//   $('#did-spec-suite-output').replaceWith(
//     `<pre
//         id="did-spec-suite-output"
//         class="example"
//         title="did-spec latest output report"
//       >
// ${JSON.stringify(suitesReportJson, null, 2)}
//       </pre>`
//   );

  $('#did-spec-report-date').replaceWith(
    `<p id="did-spec-report-date" class="note">
These test results were last generated 
<span>
${moment().format('LLLL')}
</span>
      </p>`
  );

  $('#did-spec-raw-result-date').replaceWith(
    `<span id="did-spec-raw-result-date">${moment().format('LLLL')}</span>`
  );

  $('#did-spec-report-terminal-results').replaceWith(
    `<script id="did-spec-report-terminal-results">
${JSON.stringify({ suitesReportTerminal }, null, 2)}
      </script>`
  );

  const updatedSpec = $.html();
  fs.writeFileSync(respecPath, updatedSpec);
};

(async () => {
  const report = await getReportResults(systemSuitesConfig);

  updateRespec(
    systemSuitesConfig,
    report.suitesReportJson,
    report.suitesReportTerminal
  );
  fs.writeFileSync(
    `../../test-vectors/did-spec.latest.json`,
    JSON.stringify(report.suitesReportJson, null, 2)
  );
})();
