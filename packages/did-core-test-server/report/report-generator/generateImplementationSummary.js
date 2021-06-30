const updateSection = require("./updateSection");

module.exports = generateImplementationSummary = ($, talliedResults) => {
    let section_id = "implementation-summary";
    let section_title = "Summary by Method Implementation";
    let method2id = talliedResults.method2id;

    if (!talliedResults) {
        updateSection($, section_id, section_title, '');
        return;
    }
    let summaryByMethod = talliedResults.summaryByMethod;
    let suiteNames = talliedResults.suiteNames;

    let result_table = `
<table class="simple implementation-summary">
<tbody>
<tr>
<th class='method' rowspan="2">Method</th>
<th class='implementation' rowspan="2">Implementation</th>
<th class='test-suites' colspan="${suiteNames.length}">Test Suites</th>
</tr>
<tr>
${ suiteNames.map(n => `<th>${n}</th>`).join("") }
</tr>
</tbody>
`;
    Object.keys(summaryByMethod).sort().forEach( method => {
      Object.keys(summaryByMethod[method]).map( implementation => {
        result_table += `<tr><td><a href="#${method2id[method]}">${method}</a></td><td>${implementation}</td>` +
        suiteNames.map( suite => {
                let r = summaryByMethod[method][implementation][suite];
                return !r ? `<td></td>` : `
<td>${r.failed ? `<span class='failed'>&nbsp;(${r.failed})</span>` : ''}
${r.passed ? `<span class='passed'>&nbsp;(${r.passed})</span>` : ''} 
${r.todo ? `<span class='todo'>&nbsp;(${r.todo})</span>` : ''} 
</td>
`;
        }).join("\n") + `</tr>\n`;
       });
    });
    result_table += `
</table>
`;

    let preamble = ``;

    updateSection($, section_id, section_title, preamble, result_table);
};
