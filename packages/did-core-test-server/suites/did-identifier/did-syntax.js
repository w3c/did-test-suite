const utils = require('../utils');

const didSyntaxTests = (suiteConfig) => {
  describe('3.1 DID Syntax', () => {
    suiteConfig.dids.forEach((didExample) => {
      describe(didExample, () => {
        it('3.1 DID Syntax - All DIDs MUST conform to the DID Syntax ' +
          'ABNF Rules.', async () => {
          expect(didExample).toBeValidDid();
        });
      });
    });
  });
};

module.exports = { didSyntaxTests };
