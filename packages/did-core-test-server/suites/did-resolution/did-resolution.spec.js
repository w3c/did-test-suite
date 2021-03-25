let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./defaultSuiteConfig.json');
}

const utils = require('./utils');

describe('did-resolution', () => {
  let i = 0;
  suiteConfig.executions.forEach((execution) => {
    const expectedOutcome = utils.findExpectedOutcome(suiteConfig.expectedOutcomes, i++);
    describe(execution.input.did, () => {
      require('./did-resolution').didResolutionTests(execution, expectedOutcome);
    });
  });
});
