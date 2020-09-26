const testResultsRelativeUrl = '/test-results/test-all-results.json';
const rawTestResultsContainer = 'raw-test-results';
const testResultsContainer = 'test-results';

const resultToEmoji = (test) => {
  return test === 'PASS' ? `✅` : `❌`;
};

const booleanToTestResult = (bool) => {
  return bool ? `PASS` : `FAIL`;
};

const booleanToEmoji = (bool) => {
  return resultToEmoji(booleanToTestResult(bool));
};

const renderScenario = (scenario) => {
  return `
  <section>
    <h3>${scenario.scenario}</h3>
    <p>
    ${resultToEmoji(scenario.test)} ${scenario.test}
    </p>
   
    <table class="simple" style="width: 100%;">
      <tr>
        <th>Assertion</th>
        <th>Description</th>
      </tr>
      ${Object.keys(scenario.assertion_results).map((assertion) => {
        const bool = scenario.assertion_results[assertion];
        return `
        <tr>
          <td>${booleanToEmoji(bool)} ${booleanToTestResult(bool)}</td>
          <td>${assertion}</td>
        </tr>
        `;
      })}
      
    </table>
  </section>
  `;
};

const renderRawTestResults = (results) => {
  document.getElementById(
    rawTestResultsContainer
  ).innerHTML += `<pre>${JSON.stringify(results, null, 2)}</pre>`;
};

const renderPrettyTestResults = (results) => {
  document.getElementById(testResultsContainer).innerHTML += `

  ${results.scenarios.map(renderScenario)}
 
  `;
};

const renderTestResults = () => {
  (async () => {
    const results = await fetch(testResultsRelativeUrl).then((response) =>
      response.json()
    );
    renderPrettyTestResults(results);
    renderRawTestResults(results);
  })();
};
