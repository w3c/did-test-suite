const utils = require('../utils');

const didSyntaxTests = (suiteConfig) => {
  describe('3.1 DID Syntax', () => {
    suiteConfig.dids.forEach((didExample) => {
      describe(didExample, () => {
        it('MUST be a valid URL.', async () => {
          expect(didExample).toBeValidUrl();
        });
        it('The URI scheme MUST be "did:"', () => {
          const url = new URL(didExample);
          expect(url.protocol === 'did:').toBe(true);
        });
        it('The DID method name MUST be an ASCII lowercase string.', () => {
          const method = didExample.split(':')[1];
          expect(method).toBeAsciiString();
          expect(method.toLowerCase()).toBe(method);
        });
        it('The DID method name MUST NOT be empty.', () => {
          const method = didExample.split(':')[1];
          expect(method).not.toBe('');
        });
      });
    });
  });
};

module.exports = { didSyntaxTests };
