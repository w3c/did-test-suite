let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default.js');
}

const utils = require('./utils');

describe('7.1.x DID Resolution', () => {
  suiteConfig.resolvers.forEach((implementation) => {
    let i = 0;
    implementation.executions.forEach((execution) => {
      const expectedOutcome = utils.findExpectedOutcome(implementation.expectedOutcomes, i++);
      require('./did-resolution').didResolutionTests(execution, expectedOutcome, implementation);
    });
  });
});
