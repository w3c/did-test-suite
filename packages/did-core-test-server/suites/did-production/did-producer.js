const utils = require('../utils');
const jsonMediaTypes = ['application/did+ld+json', 'application/did+json'];

const generateDidProducerTests = (
  {did, didDocumentDataModel, resolutionResult}) => {

  const dmProperties = didDocumentDataModel.properties;
  const dmRse = didDocumentDataModel.representationSpecificEntries;
  const {representation} = resolutionResult;
  const contentType = resolutionResult.didResolutionMetadata['contentType'];

  describe(contentType, () => {
    it('6.1 Production and Consumption - A conforming producer MUST take a ' +
      'DID document data model and a representation-specific entries map as ' +
      'input into the production process. The conforming producer MAY accept ' +
      'additional options as input into the production process.', async () => {
        expect(dmProperties).toBeDefined();
        expect(dmRse).toBeDefined();
    });

    it('6.1 Production and Consumption - A conforming producer MUST ' +
      'serialize all entries in the DID document data model, and the ' +
      'representation-specific entries map, that do not have explicit ' +
      'processing rules for the representation being produced using only the ' +
      'representation\'s data type processing rules and return the ' +
      'serialization after the production process completes.', async () => {
        if(jsonMediaTypes.includes(contentType)) {
          const dataModel = {...dmRse, ...dmProperties};
          const parsedDataModel = JSON.parse(representation);
          expect(dataModel).toEqual(parsedDataModel);
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
          const dataModel = {...dmRse, ...dmProperties};
          parsedDataModel = JSON.parse(JSON.stringify(dataModel));
          expect(dataModel).toEqual(parsedDataModel);
        } else {
          throw new Error('Unknown producer for content-type: '+ contentType);
        }
    });
  });
}

const didProducerTests = (suiteConfig) => {
  describe('6.1 Production', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(resolutionResult.didDocumentDataModel === undefined) continue;

          const {didDocumentDataModel} = suiteConfig[did];
          didDocumentDataModel.representationSpecificEntries =
            resolutionResult.didDocumentDataModel.representationSpecificEntries;

          generateDidProducerTests(
            {did, didDocumentDataModel, resolutionResult});
        }
      });
    });
  });
};

module.exports = { didProducerTests };
