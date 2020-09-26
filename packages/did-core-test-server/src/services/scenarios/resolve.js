const assertions = {
  'did should match did-document id': (scenario) => {
    return scenario.input.did === scenario.output['did-document'].id;
  },
};

const testResolve = (scenario) => {
  let assertion_results = {};

  Object.keys(assertions).forEach((assertion) => {
    assertion_results = {
      ...assertion_results,
      [assertion]: assertions[assertion](scenario),
    };
  });

  const test_result = Object.values(assertion_results).every((result) => {
    return result === true;
  });

  return {
    scenario: scenario.name,
    test: test_result ? 'PASS' : 'FAIL',
    assertion_results,
  };
};

module.exports = testResolve;
