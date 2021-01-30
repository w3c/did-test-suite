const testSuiteManagerEndpoint =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080/test-suite-manager/generate-report'
    : 'https://vc.transmute.world/test-suite-manager/generate-report';

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

var editor = ace.edit('report-suites-input');
editor.setTheme('ace/theme/github');
editor.session.setMode('ace/mode/json');
editor.setValue(
  JSON.stringify(
    [
      {
        name: 'did-spec',
        didMethods: {
          'did:range14': {
            supportedContentTypes: ['application/did+json'],
            dids: ['did:range14:123'],
            'did:range14:123': {
              'application/did+json': {
                didDocument: {
                  '@context': ['https://www.w3.org/ns/did/v1'],
                  id: 'did:range14:123',
                },
                didDocumentMetaData: {
                  'content-type': 'application/did+json',
                },
                didResolutionMetaData: {},
              },
            },
          },
        },
      },
    ],
    null,
    2
  )
);

var term = new Terminal({
  convertEol: true,
});
term.open(document.getElementById('terminal'));

var generateReport = async () => {
  try {
    const res = await fetch(testSuiteManagerEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/ld+json',
      },
      method: 'post',
      body: editor.getValue(),
    });

    const responseBody = await res.json();

    let encodedReport = responseBody.suitesReportTerminal;

    renderReportResults(
      'on-demand-report-results',
      responseBody.suitesReportJson
    );

    term.reset();
    term.write(b64DecodeUnicode(encodedReport));
    alert('succeeded');
  } catch (e) {
    alert('failed');
  }
};

const resultToEmoji = (test) => {
  return test === 'passed' ? `✅` : `❌`;
};

const renderReportResults = (target, results) => {
  let flattenMethodResults = {};

  results[0].testResults.forEach((tr) => {
    let ancestorsWithoutMethod = tr.ancestors.filter((a) => {
      return !a.includes(tr.ancestors[1]);
    });

    let testAncestorsWithoutMethod = ancestorsWithoutMethod.join(' > ');
    let testKey = `${testAncestorsWithoutMethod} > ${tr.title}`;
    let didMethodTestResult = {
      status: tr.status,
      method: tr.ancestors[1],
    };

    if (!flattenMethodResults[testKey]) {
      flattenMethodResults[testKey] = {
        ancestorsWithoutMethod: ancestorsWithoutMethod.splice(1),
        title: tr.title,
        didMethods: [didMethodTestResult],
      };
    } else {
      flattenMethodResults[testKey].didMethods.push(didMethodTestResult);
    }
  });

  const resultsSorted = Object.values(flattenMethodResults).sort((a, b) => {
    return a.ancestorsWithoutMethod.join(' > ') >
      b.ancestorsWithoutMethod.join(' > ')
      ? 1
      : -1;
  });

  // this makes thing hierarchical again
  let resultsBySection = {};
  let root = resultsBySection;
  resultsSorted.forEach((tr) => {
    root = resultsBySection;
    if (tr.ancestorsWithoutMethod.length > 1) {
      let tail;
      for (let i = 0; i < tr.ancestorsWithoutMethod.length; i++) {
        let sectionName = tr.ancestorsWithoutMethod[i];
        if (!root[sectionName]) {
          root[sectionName] = {};
        } else {
          root[sectionName] = {
            ...root[sectionName],
          };
        }
        tail = root;
        root = root[sectionName];
      }
      Object.keys(tail).forEach((tailKey) => {
        tail[tailKey] = {
          ...tail[tailKey],
          [tr.title]: tr.didMethods,
          isLeaf: true,
        };
      });
    } else {
      root[tr.ancestorsWithoutMethod[0]] = {
        ...root[tr.ancestorsWithoutMethod[0]],
        isLeaf: true,
        [tr.title]: tr.didMethods,
      };
    }
  });

  const recursiveRenderSection = (section, level) => {
    let result = '';
    if (section && !section.isLeaf && Object.keys(section).length) {
      result = `

        ${Object.keys(section)
          .map((key) => {
            const value = section[key];
            const subSection = recursiveRenderSection(value, level + 1);
            return `
<section>
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
          if (statement === 'isLeaf') {
            return '';
          }
          const count = section[statement]
            .map((test) => {
              return {
                status: test.status === 'passed' ? 'passed' : 'failed',
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
<th> </th>
<th> ${count.failed ? resultToEmoji('failed') + ` (${count.failed})` : ''} 
&nbsp;
${count.passed ? resultToEmoji('passed') + ` (${count.passed})` : ''} 
</th>
</tr>
    ${section[statement]
      .map((tr) => {
        return `
<tr>
<td>${resultToEmoji(tr.status)}</td>
<td style="width: 100%;">${tr.method}</td>
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
  const testResultReport = recursiveRenderSection(resultsBySection, level);
  document.getElementById(target).innerHTML =
    document.getElementById(target).innerHTML + testResultReport;
};

const lastDidSpecReport = JSON.parse(
  document.getElementById('did-spec-suite-output').innerHTML
);

renderReportResults('report-results', lastDidSpecReport);
