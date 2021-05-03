let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default');
}

const utils = require('./utils');

describe('7.2.x DID URL Dereferencing', () => {
  suiteConfig.dereferencers.forEach((implementation) => {
    let i = 0;
    implementation.executions.forEach((execution) => {
      const expectedOutcome = utils.findExpectedOutcome(implementation.expectedOutcomes, i++);
      require('./did-url-dereferencing').didUrlDereferencingTests(execution, expectedOutcome, implementation);
    });
  });
});
