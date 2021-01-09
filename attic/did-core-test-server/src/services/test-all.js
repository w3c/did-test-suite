const { test_scenario } = require('./test-scenario');

const test_all = ({ scenarios }) => {
  const results = scenarios.map((scenario) => {
    return test_scenario(scenario.request);
  });

  const test_result = results.every((scenario_test_result) => {
    return scenario_test_result.test === 'PASS';
  });

  const result = {
    test: test_result ? 'PASS' : 'FAIL',
    scenarios: results,
  };
  return result;
};

module.exports = { test_all };
