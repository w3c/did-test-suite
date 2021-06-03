let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

const utils = require('../resolution-utils');

describe("suites/did-resolution", () => {
  runtimeSuiteConfig.resolvers.forEach((imp) => {
    const {didMethod, implementation, implementer} = imp;

    describe(`IMPLEMENTATION ::${didMethod}::${implementation}::${implementer}::`, () => {
      let suiteName = `7.1.x DID Resolution - ${imp.implementation} - ${imp.implementer}`;

      describe(suiteName, () => {
        it('All conformant DID resolvers MUST implement the DID resolution functions for at least one DID method and MUST be able to return a DID document in at least one conformant representation.', async () => {
          expect(imp.executions).not.toBeEmpty();
          const execution = imp.executions.find((execution) => (execution.function === 'resolveRepresentation'));
          expect(execution).not.toBeFalsy();
          utils.expectConformantDidDocumentRepresentation(execution.output.didDocumentStream, execution.output.didResolutionMetadata.contentType);
        });
        let i = 0;
        imp.executions.forEach((execution) => {
          const expectedOutcome = utils.findExpectedOutcome(imp.expectedOutcomes, i++);
          require('./did-resolution').didResolutionTests(execution, expectedOutcome, implementation);
        });
      });
    });
  });
});
