const utils = require('./utils');
const jsonMediaTypes = ['application/did+ld+json', 'application/did+json'];
const deepEqual = require('deep-equal')

const generateDidProducerTests = ({did, resolutionResult}) => {
  const {didDocument} = resolutionResult;
  const contentType = resolutionResult.didDocumentMetaData['content-type'];

  it('1.4 Conformance - A conforming producer MUST NOT produce ' +
    'non-conforming DIDs or DID documents.', async () => {
      if(jsonMediaTypes.includes(contentType)) {
        reserializedDidDocument = JSON.parse(JSON.stringify(didDocument));
        expect(deepEqual(didDocument, reserializedDidDocument)).toBe(true);
      } else {
        throw new Error('Unknown producer for content-type: '+ contentType);
      }
  });

  it('6.1 Production and Consumption - A conforming producer MUST serialize ' +
    'all entries in the data model that do not have explicit processing ' +
    'rules for the representation being produced using only the ' +
    'representation\'s data type processing rules.', async () => {
      if(jsonMediaTypes.includes(contentType)) {
        reserializedDidDocument = JSON.parse(JSON.stringify(didDocument));
        expect(deepEqual(didDocument, reserializedDidDocument)).toBe(true);
      } else {
        throw new Error('Unknown producer for content-type: '+ contentType);
      }
  });

  it('6.1 Production and Consumption - A conforming producer MUST indicate ' +
    'which representation has been used for a DID document via a Media Type ' +
    'as described in § 7.1.2 DID Resolution Metadata.', async () => {
      expect(typeof contentType === 'string').toBe(true);
  });
}

const didProducerTests = (suiteConfig) => {
  describe('did-producer', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          generateDidProducerTests({did, resolutionResult});
        }
      });
    });
  });
};

module.exports = { didProducerTests };
