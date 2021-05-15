let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

const utils = require('../resolution-utils');

describe("suites/did-url-dereferencing", () => {
  runtimeSuiteConfig.dereferencers.forEach((implementation) => {
    describe("IMPLEMENTATION <" + implementation.implementation + ">", () => {
      let suiteName = `7.2.x DID URL Dereferencing - ${implementation.implementation} - ${implementation.implementer}`;

      describe(suiteName, () => {
        let i = 0;
        implementation.executions.forEach((execution) => {
          const expectedOutcome = utils.findExpectedOutcome(implementation.expectedOutcomes, i++);
          require('./did-url-dereferencing').didUrlDereferencingTests(execution, expectedOutcome, implementation);
        });
      });
    });
  });
});
