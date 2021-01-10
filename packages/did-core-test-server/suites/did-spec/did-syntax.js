const utils = require('./utils');

const didSyntaxTests = (suiteConfig) => {
  describe('did-syntax', () => {
    suiteConfig.dids.forEach((didExample) => {
      describe(didExample, () => {
        it('MUST be a valid URL.', async () => {
          expect(utils.isValidURL(didExample)).toBe(true);
        });
        it('The URI scheme MUST be "did:"', () => {
          const url = new URL(didExample);
          expect(url.protocol === 'did:').toBe(true);
        });
        it('The DID method name MUST be an ASCII lowercase string.', () => {
          const method = didExample.split(':')[1];
          expect(utils.isAsciiString(method)).toBe(true);
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
