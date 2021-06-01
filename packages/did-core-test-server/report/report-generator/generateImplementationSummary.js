const updateSection = require("./updateSection");

module.exports = generateImplementationSummary = ($, talliedResults) => {
    let section_id = "implementation-summary";
    let section_title = "Summary by Method Implementation";

    if (!talliedResults) {
        updateSection($, section_id, section_title, '');
        return;
    }
    let summaryByMethod = talliedResults.summaryByMethod;
    let suiteNames = talliedResults.suiteNames;

    let result_table = `
<style>
.implementation-summary { table-layout: auto; }
.implementation-summary .failed:before { content: "❌"; }
.implementation-summary .passed:before { content: "✅"; }
.implementation-summary .todo:before { content: "⚠️"; }
.implementation-summary .method { width: 10%; }
.implementation-summary .implementation { width: 20%; }
</style>
<table class="simple implementation-summary" style="width: 100%;">
<tbody>
<tr>
<th class='method' rowspan="2">Method</th>
<th class='implementation' rowspan="2">Implementation</th>
<th colspan="${suiteNames.length}">Test Suites</th>
</tr>
<tr>
${ suiteNames.map(n => `<th>${n}</th>`).join("") }
</tr>
</tbody>
`;
    Object.keys(summaryByMethod).sort().forEach( method => {
      Object.keys(summaryByMethod[method]).map( implementation => {
        result_table += `<tr><td>${method}</td><td>${implementation}</td>` +
        suiteNames.map( suite => {
                let r = summaryByMethod[method][implementation][suite];
                return !r ? `<td></td>` : `
<td>${r.failed ? `<span class='failed'>&nbsp;(${r.failed})</span>` : ''}
${(r.failed && r.passed) ? `<br/>` : ''}
${r.passed ? `<span class='passed'>&nbsp;(${r.passed})</span>` : ''} 
${(r.todo && r.todo) ? `<br/>` : ''}
${r.todo ? `<span class='todo'>&nbsp;(${r.todo})</span>` : ''} 
</td>
`;
        }).join("\n") + `</tr>\n`;
       });
    });
    result_table += `
</table>
`;
    updateSection($, section_id, section_title, result_table);
};
