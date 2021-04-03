let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default');
}

const utils = require('./utils');

describe('7.2 DID URL Dereferencing', () => {
  let i = 0;
  suiteConfig.dereferencers.forEach((dereferencer) => {
    dereferencer.executions.forEach((execution) => {
      const expectedOutcome = utils.findExpectedOutcome(dereferencer.expectedOutcomes, i++);
      describe(execution.input.didUrl, () => {
        require('./did-url-dereferencing').didUrlDereferencingTests(execution, expectedOutcome);
      });
    });
  });
});
