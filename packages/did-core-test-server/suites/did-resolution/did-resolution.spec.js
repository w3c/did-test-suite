let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default.js');
}

const utils = require('../resolution-utils');

suiteConfig.resolvers.forEach((implementation) => {
  let implementationName = `7.1.x DID Resolution - ${implementation.implementation} - ${implementation.implementer}`;

  describe(implementationName, () => {
    it('All conformant DID resolvers MUST implement the DID resolution functions for at least one DID method and MUST be able to return a DID document in at least one conformant representation.', async () => {
      expect(implementation.executions).not.toBeEmpty();
      const execution = implementation.executions.find((execution) => (execution.function === 'resolveRepresentation'));
      expect(execution).not.toBeFalsy();
      utils.expectKnownConformantMediaType(execution.output.didResolutionMetadata.contentType);
      utils.expectConformantDidDocument(utils.consumeRepresentation(execution.output.didDocumentStream));
    });
    let i = 0;
    implementation.executions.forEach((execution) => {
      const expectedOutcome = utils.findExpectedOutcome(implementation.expectedOutcomes, i++);
      require('./did-resolution').didResolutionTests(execution, expectedOutcome, implementation);
    });
  });
});
