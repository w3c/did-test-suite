// function to clip long DID (max 32 chars for method-specific-id) or long value(max 64chars)
const value_clip = (v) => {
  let r = v.replace(/^((value=)?(did:[^:]+:.{0,32}|.{0,64})).*$/, "$1");
  return r != v ?  `${r}\u{2026}` : r;
};

module.exports = recursiveRenderSection = (id, section, title2id, id_tweak, subsection_prefix, level, summary_titles, summary_line, sort_func_given = null) => {
    let result = '';
    let section_number = 1;
    let summary_titles_html = summary_titles.map( t => `<th class="${t.toLowerCase()}">${t}</th>`).join("\n");

    let sort_func_default = (a,b) => { let order1 =  a.did_method.localeCompare(b.did_method); // order by method
      return order1 == 0 && a.title.localeCompare(b.title);   // then title
    };
    let sort_func = sort_func_given || sort_func_default;

    if (section && id && Object.keys(section).length) {
      result = `

    ${Object.keys(section).sort()
      .map((key) => {
        const value = section[key];
        const subSection = recursiveRenderSection(null, value, title2id, null, null, level + 1, summary_titles, summary_line);
        return `
<section id="${id_tweak(id,key,section_number++)}">
<h${level}>${key}</h${level}>
${subsection_prefix(key,value)}${subSection}
</section>
    `;
      })
      .join('\n')}

              `;
    } else {
      result = Object.keys(section)
        .map((statement) => {
          const allImplementations = new Set(section[statement].map((test) => {
            if(test.implementation.includes('Example')) {
              return 'EXAMPLE';
            }

            return test.implementation;
          }));
          allImplementations.delete('EXAMPLE');
          const implementations = allImplementations.size;
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
<table class="simple test-status">
<tbody>
<tr>
<th class='status'>${count.failed ? `<span class='failed'>&nbsp;(${count.failed})</span>` : ''}
${(count.failed && count.passed) ? `<br/>` : ''}
${count.passed ? `<span class='passed'>&nbsp;(${count.passed - 1})</span>` : ''}
${(count.todo && count.todo) ? `<br/>` : ''}
${count.todo ? `<span class='todo'>&nbsp;(${count.todo})</span>` : ''}
</th>
${summary_titles_html}
<th class='param'>Parameters</th>
</tr>
${(!statement.startsWith("Implementation:"))
    ? '<tr><td colspan=4>' +
      'Total implementations: ' + implementations +
      '</td></tr>'
    : ''
}
${(implementations < 2 && !statement.startsWith("Implementation:"))
    ? '<tr><td colspan=4>' +
      '<div class="issue" title="Insufficient implementations">' +
      'At least two independent and conforming implementations do not ' +
      'exist for the following feature: ' + statement +
      '</div></td></tr>'
    : ''
}

${section[statement]
  .sort(sort_func).map((tr) => {
    if(tr.implementation.includes('Example') &&
      !statement.startsWith("Implementation:")) {
      return '';
    }

    return `
<tr>
<td class='${tr.status}'></td>
${summary_line(tr)}
<td>${tr.parameters.map( (v) => {
    return v ? value_clip(v) : ''; // Replacing long string into shorter one with ellipsis
  }).join(', ')}</td>
</tr>
`;
  })
  .join('\n')}
</table>
`;

          let statement_with_tag = `<p>${statement}</p>`;
          if (title2id) {
            statement_with_tag = `<h${level} class="statement-header" id="${title2id[statement]}"}>Statement: ${statement}</h${level}>`;
          }

          return `
<div>
${statement_with_tag}
${resultTable}
</div>
`;
        })
        .join('\n');
    }

    return result;
};
