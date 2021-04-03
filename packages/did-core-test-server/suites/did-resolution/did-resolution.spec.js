let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default.js');
}

const utils = require('./utils');

describe('7.1 DID Resolution', () => {
  let i = 0;
  suiteConfig.resolvers.forEach((implementation) => {
    implementation.executions.forEach((execution) => {
      const expectedOutcome = utils.findExpectedOutcome(implementation.expectedOutcomes, i++);
      describe(execution.input.did, () => {
        require('./did-resolution').didResolutionTests(execution, expectedOutcome);
      });
    });
  });
});
