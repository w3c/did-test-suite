const utils = require('./utils');

// https://www.w3.org/TR/xmlschema11-2/#nt-dateTimeRep
// Constrained to UTC and without sub-second decimal precision.
// Note: day-of-month constraints not applied.
const versionTimeRe = /^(-?(?:[1-9][0-9]{3,})|(?:0[0-9]{3}))-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T((?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]|24:00:00)(?:\.0+)?(?:Z|[+-]00:00)$/;

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

          if (didParameter === 'relativeRef') {
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

          if (didParameter === 'versionTime') {
            it('MUST be [an ASCII string which is] a valid XML datetime value, as defined in section 3.3.7 of W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes [XMLSCHEMA11-2]. This datetime value MUST be normalized to UTC 00:00:00 and without sub-second decimal precision. For example: 2020-12-20T19:17:47Z.', async () => {
              const didUrl = suiteConfig.didParameters[didParameter];
              const param = utils.getQueryParamValueFromDidUri(
                didUrl,
                'versionTime'
              );

              expect(versionTimeRe.test(param)).toBe(true);
            });
          }

        });
      });
    });
  }
};

module.exports = { didParametersTests };
