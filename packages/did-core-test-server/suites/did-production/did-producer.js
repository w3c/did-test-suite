const utils = require('../utils');
const jsonMediaTypes = ['application/did+ld+json', 'application/did+json'];
const deepEqual = require('deep-equal')

const generateDidProducerTests = ({did, resolutionResult}) => {
  const {didDocument} = resolutionResult;
  const contentType = resolutionResult.didResolutionMetadata['contentType'];

  it('6.1 Production and Consumption - A conforming producer MUST take a ' +
    'DID document data model and a representation-specific entries map as ' +
    'input into the production process. The conforming producer MAY accept ' +
    'additional options as input into the production process.', async () => {
      if(contentType === 'application/did+ld+json') {
        const context = didDocument['@context'];
        if(typeof context === 'string') {
          expect(context).toBe('https://www.w3.org/ns/did/v1');
        } else if(Array.isArray(context)) {
          expect(context[0]).toBe('https://www.w3.org/ns/did/v1');
          reserializedContext = JSON.parse(JSON.stringify(context));
          expect(deepEqual(context, reserializedContext)).toBe(true);
        } else {
          throw new Error('Invalid @context value '+ context);
        }
      }
  });

  it('6.1 Production and Consumption - A conforming producer MUST ' +
    'serialize all entries in the DID document data model, and the ' +
    'representation-specific entries map, that do not have explicit ' +
    'processing rules for the representation being produced using only the ' +
    'representation\'s data type processing rules and return the ' +
    'serialization after the production process completes.', async () => {
      if(jsonMediaTypes.includes(contentType)) {
        reserializedDidDocument = JSON.parse(JSON.stringify(didDocument));
        expect(deepEqual(didDocument, reserializedDidDocument)).toBe(true);
      } else {
        throw new Error('Unknown producer for content-type: '+ contentType);
      }
  });

  it('6.1 Production and Consumption - A conforming producer MUST return ' +
    'the Media Type string associated with the representation after the ' +
    'production process completes.', async () => {
      expect(typeof contentType === 'string').toBe(true);
  });

  it('6.1 Production and Consumption - A conforming producer MUST NOT ' +
    'produce non-conforming DIDs or DID documents.', async () => {
      if(jsonMediaTypes.includes(contentType)) {
        reserializedDidDocument = JSON.parse(JSON.stringify(didDocument));
        expect(deepEqual(didDocument, reserializedDidDocument)).toBe(true);
      } else {
        throw new Error('Unknown producer for content-type: '+ contentType);
      }
  });
}

const didProducerTests = (suiteConfig) => {
  describe('6.1 Production', () => {
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
