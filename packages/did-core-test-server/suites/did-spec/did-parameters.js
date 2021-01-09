const utils = require('./utils');

const didParametersTests = (suiteConfig) => {
  if (suiteConfig.didParameters) {
    describe('did-parameters', () => {
      Object.keys(suiteConfig.didParameters).forEach((didParameter) => {
        describe(didParameter, () => {
          it('The associated value MUST be an ASCII string.', async () => {
            const didUrl = suiteConfig.didParameters[didParameter];
            const param = utils.getQueryParamValueFromDidUri(
              didUrl,
              didParameter
            );
            expect(utils.isAsciiString(param)).toBe(true);
          });

          if (didParameter === 'relative-ref') {
            it('MUST use percent-encoding for certain characters as specified in RFC3986 Section 2.1.', async () => {
              const didUrl = suiteConfig.didParameters[didParameter];
              const param = utils.getQueryParamValueFromDidUri(
                didUrl,
                'relativeRef'
              );

              if (param.includes('/')) {
                expect(didUrl.includes('%2F')).toBe(true);
              }
            });
          }
        });
      });
    });
  }
};

module.exports = { didParametersTests };
