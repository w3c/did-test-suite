// function to clip long DID
const did_clip = (v) => {
  let r = v.replace(/^((value=)?(did:[^:]+:.{0,16})).*$/, "$1");
  if (r != v) {
    r += "\u{2026}";
  }
  return r;
};

module.exports = recursiveRenderSection = (id, section, level, summary_titles, summary_line) => {
    let result = '';
    let section_number = 1;
    let summary_titles_html = summary_titles.map( t => `<th class="${t.toLowerCase()}">${t}</th>`).join("\n");

    if (section && id && Object.keys(section).length) {
      result = `

    ${Object.keys(section)
      .map((key) => {
        const value = section[key];
        const subSection = recursiveRenderSection(null, value, level + 1, summary_titles, summary_line);
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
<style>
.test-status { table-layout: auto; }
.test-status .failed:before { content: "❌"; }
.test-status .passed:before { content: "✅"; }
.test-status .todo:before { content: "⚠️"; }
.test-status .status { width: 10%; }
.test-status .suite { width: 20%; }
.test-status .implementation { width: 20%; }
.test-status .param { width: auto; }
</style>
<table class="simple test-status" style="width: 100%;">
<tbody>
<tr>
<th class='status'>${count.failed ? `<span class='failed'>&nbsp;(${count.failed})</span>` : ''}
${(count.failed && count.passed) ? `<br/>` : ''}
${count.passed ? `<span class='passed'>&nbsp;(${count.passed})</span>` : ''} 
${(count.todo && count.todo) ? `<br/>` : ''}
${count.todo ? `<span class='todo'>&nbsp;(${count.todo})</span>` : ''} 
</th>
${summary_titles_html}
<th class='param'>Parameters</th>
</tr>
${section[statement]
  .sort((a,b) => { return a.did_method.localeCompare(b.did_method); }).map((tr) => {
    return `
<tr>
<td class='${tr.status}'></td>
${summary_line(tr)}
<td>${tr.parameters.map( (v) => {
    return v ? did_clip(v) : ''; // Replacing long string into shorter one with ellipsis
  }).join(', ')}</td>
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