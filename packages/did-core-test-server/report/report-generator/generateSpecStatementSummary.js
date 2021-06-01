const updateSection = require("./updateSection");

const plural = (v, s) => {
    return `${v} ${s}${v == 1 ? '' : 's'}`;
};

const count_or_null = (n) => {
    return n == 1 ? "" : `(${n})`;
};

module.exports = generateSpecStatementSummary = ($, talliedResults) => {
    let section_id = "spec-statement-summary";
    let section_title = "Summary by Specification Statements";

    if (!talliedResults) {
        updateSection($, section_id, section_title, '');
        return;
    }
    let summaryByTitle= talliedResults.summaryByTitle;

    let result_table = `
<style>
.spec-statement-summary { table-layout: auto; }
.spec-statement-summary .failed:before { content: "❌"; }
.spec-statement-summary .passed:before { content: "✅"; }
.spec-statement-summary .todo:before { content: "⚠️"; }
.spec-statement-summary .title { width: 60%; }
.spec-statement-summary td.title { vertical-align: top; }
.spec-statement-summary .methods { width: 30%; }
.spec-statement-summary td.methods { vertical-align: top; }
</style>
Note: Numbers in parentheses denote the number of implementations.
If the number of implementations is one, the number and parentheses
are suppressed for readability.
<table class="simple spec-statement-summary" style="width: 100%;">
<tbody>
<tr>
<th class='title'>Specification Statement</th>
<th class='methods'>Methods</th>
</tr>
</tbody>
`;
    Object.keys(summaryByTitle).sort().forEach( title => {
        let passed_methods = [];
        let failed_methods = [];
        let todo_methods = [];

        Object.keys(summaryByTitle[title]).sort().map( method => {
            let m = method.replace(/^did:(.*)$/, "$1");
            let status = summaryByTitle[title][method];
            if (status['passed']) {
                passed_methods.push(`${m}${count_or_null(status['passed'].length)}`);
            }
            if (status['failed']) {
                failed_methods.push(`${m}${count_or_null(status['failed'].length)}`);
            }
            if (status['todo']) {
                todo_methods.push(`${m}${count_or_null(status['todo'].length)}`);
            }
        });

        let status_set = [];
        if (passed_methods.length) {
            status_set.push(`<span class="passed"><strong>[${plural(passed_methods.length, 'method')}]: </strong>${passed_methods.join(', ')}</span>`);
        }
        if (failed_methods.length) {
            status_set.push(`<span class="failed"><strong>[${plural(failed_methods.length, 'method')}]: </strong>${failed_methods.join(', ')}</span>`);
        }
        if (todo_methods.length) {
            status_set.push(`<span class="todo"><strong>[${plural(todo_methods.length, 'method')}]: </strong>${todo_methods.join(', ')}</span>`);
        }
        result_table += `<tr><td class="title">${title}</td><td class="methods">` + status_set.join("<br/>\n") + `</td></tr>\n`;
    });
    result_table += `
</table>
`;
    updateSection($, section_id, section_title, result_table);
};
