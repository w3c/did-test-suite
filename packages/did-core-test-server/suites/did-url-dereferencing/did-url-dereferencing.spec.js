let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./defaultSuiteConfig.json');
}

const utils = require('./utils');

describe('did-url-dereferencing', () => {
  let i = 0;
  suiteConfig.executions.forEach((execution) => {
    const expectedOutcome = utils.findExpectedOutcome(suiteConfig.expectedOutcomes, i++);
    describe(execution.input.didUrl, () => {
      require('./did-url-dereferencing').didUrlDereferencingTests(execution, expectedOutcome);
    });
  });
});
