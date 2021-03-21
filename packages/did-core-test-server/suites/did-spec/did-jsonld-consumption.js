const deepEqual = require('deep-equal')

const generateJsonldConsumptionTests = ({did, resolutionResult}) => {
  const {didDocument} = resolutionResult;

  it('6.3.2 JSON-LD Consumption - The DID document and any DID document ' +
    'data structures expressed by a JSON-LD representation MUST be ' +
    'deserialized into the data model according to the JSON ' +
    'representation consumption rules as defined in § 6.2 JSON.', async () => {
      reserializedDidDocument = JSON.parse(JSON.stringify(didDocument));
      expect(deepEqual(didDocument, reserializedDidDocument)).toBe(true);
  });
}

const didJsonldConsumptionTests = (suiteConfig) => {
  describe('did-jsonld-consumption', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(mediaType === 'application/did+ld+json') {
            generateJsonldConsumptionTests({did, resolutionResult});
          }
        }
      });
    });
  });
};

module.exports = { didJsonldConsumptionTests };
