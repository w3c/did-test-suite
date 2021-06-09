let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

const utils = require('../resolution-utils');

describe("suites/did-url-dereferencing", () => {
  runtimeSuiteConfig.dereferencers.forEach((imp) => {
    const {didMethod, implementation, implementer} = imp;

    describe(`IMPLEMENTATION ::${didMethod}::${implementation}::${implementer}::`, () => {
      let suiteName = `7.2.x DID URL Dereferencing - ${imp.implementation} - ${imp.implementer}`;

      describe(suiteName, () => {
        let i = 0;
        imp.executions.forEach((execution) => {
          const expectedOutcome = utils.findExpectedOutcome(imp.expectedOutcomes, i++);
          require('./did-url-dereferencing').didUrlDereferencingTests(execution, expectedOutcome, imp);
        });
      });
    });
  });
});
