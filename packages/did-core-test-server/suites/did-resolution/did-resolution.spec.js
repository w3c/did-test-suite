let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

const utils = require('../resolution-utils');

describe("suites/did-resolution", () => {
  runtimeSuiteConfig.resolvers.forEach((implementation) => {
  
    describe("IMPLEMENTATION <" + implementation.implementation + ">", () => {
      let suiteName = `7.1.x DID Resolution - ${implementation.implementation} - ${implementation.implementer}`;

      describe(suiteName, () => {
        it('All conformant DID resolvers MUST implement the DID resolution functions for at least one DID method and MUST be able to return a DID document in at least one conformant representation.', async () => {
          expect(implementation.executions).not.toBeEmpty();
          const execution = implementation.executions.find((execution) => (execution.function === 'resolveRepresentation'));
          expect(execution).not.toBeFalsy();
          utils.expectConformantDidDocumentRepresentation(execution.output.didDocumentStream, execution.output.didResolutionMetadata.contentType);
        });
        let i = 0;
        implementation.executions.forEach((execution) => {
          const expectedOutcome = utils.findExpectedOutcome(implementation.expectedOutcomes, i++);
          require('./did-resolution').didResolutionTests(execution, expectedOutcome, implementation);
        });
      });
    });
  });
});
