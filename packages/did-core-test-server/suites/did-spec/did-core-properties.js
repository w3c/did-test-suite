const utils = require('./utils');
const {isValidDID} = utils;

const jsonMediaTypes = ['application/did+ld+json', 'application/did+json'];

const generateDidCorePropertiesTests = ({did, resolutionResult}) => {
  const {didDocument} = resolutionResult;

  it('5.1.1 DID Subject - The value of id MUST be a string that ' +
    'conforms to the rules in § 3.1 DID Syntax and MUST exist in the root ' +
    'map of the data model for the DID document.', async () => {
      expect(didDocument).toHaveProperty('id');
      expect(isValidDID(didDocument.id)).toBe(true);
  });
}

const didCorePropertiesTests = (suiteConfig) => {
  describe('did-core-properties', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(jsonMediaTypes.includes(mediaType)) {
            generateDidCorePropertiesTests({did, resolutionResult});
          }
        }
      });
    });
  });
};

module.exports = { didCorePropertiesTests };
