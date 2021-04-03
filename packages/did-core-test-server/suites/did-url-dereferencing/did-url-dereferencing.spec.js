let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default');
}

const utils = require('./utils');

describe('7.2.x DID URL Dereferencing', () => {
  let i = 0;
  suiteConfig.dereferencers.forEach((dereferencer) => {
    dereferencer.executions.forEach((execution) => {
      const expectedOutcome = utils.findExpectedOutcome(dereferencer.expectedOutcomes, i++);
      require('./did-url-dereferencing').didUrlDereferencingTests(execution, expectedOutcome);
    });
  });
});
