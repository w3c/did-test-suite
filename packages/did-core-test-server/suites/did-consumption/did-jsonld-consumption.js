const generateJsonldConsumptionTests = (
  {did, didDocumentDataModel, resolutionResult}) => {
  const didDocument = {
    ...didDocumentDataModel.properties,
    ...didDocumentDataModel.representationSpecificEntries
  };
  const {representation} = resolutionResult;

  it('6.3.2 JSON-LD Consumption - The DID document and any DID document ' +
    'data structures expressed by a JSON-LD representation MUST be ' +
    'deserialized into the data model according to the JSON ' +
    'representation consumption rules as defined in § 6.2 JSON.', async () => {
      const consumedDidDocument = JSON.parse(representation);
      expect(didDocument).toEqual(consumedDidDocument);
  });
}

const didJsonldConsumptionTests = (suiteConfig) => {
  describe('6.3.2 JSON-LD Consumption', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(mediaType === 'application/did+ld+json') {
            const {didDocumentDataModel} = suiteConfig[did];
            didDocumentDataModel.representationSpecificEntries =
              resolutionResult.didDocumentDataModel.
              representationSpecificEntries;

            generateJsonldConsumptionTests(
              {did, didDocumentDataModel, resolutionResult});
          }
        }
      });
    });
  });
};

module.exports = { didJsonldConsumptionTests };
