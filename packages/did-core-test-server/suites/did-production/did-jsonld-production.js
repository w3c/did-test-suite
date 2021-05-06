const generateJsonldProductionTests = (
  {did, didDocumentDataModel, resolutionResult}) => {
  const didDocument = {
    ...didDocumentDataModel.properties,
    ...didDocumentDataModel.representationSpecificEntries
  };

  it('6.3.1 JSON-LD Production - The DID document and any DID document ' +
    'data structures expressed by the data model MUST be serialized to the ' +
    'JSON-LD representation according to the JSON representation production ' +
    'rules as defined in § 6.2 JSON.', async () => {
      reserializedDidDocument = JSON.parse(JSON.stringify(didDocument));
      expect(didDocument).toEqual(reserializedDidDocument);
  });

  it('6.3.1 JSON-LD Production - In addition to using the JSON  ' +
    'representation production rules, JSON-LD production MUST include the ' +
    'representation-specific @context entry.', async () => {
      expect(didDocument).toHaveProperty('@context');
  });

  it('6.3.1 JSON-LD Production - The serialized value of @context ' +
    'MUST be the JSON String https://www.w3.org/ns/did/v1, or a JSON ' +
    'Array where the first item is the JSON String ' +
    'https://www.w3.org/ns/did/v1 and the subsequent items are serialized ' +
    'according to the JSON representation production rules.', async () => {
      const context = didDocument['@context'];

      if(typeof context === 'string') {
        expect(context).toBe('https://www.w3.org/ns/did/v1');
      } else if(Array.isArray(context)) {
        expect(context[0]).toBe('https://www.w3.org/ns/did/v1');
        reserializedContext = JSON.parse(JSON.stringify(context));
        expect(context).toEqual(reserializedContext);
      } else {
        throw new Error('Invalid @context value '+ context);
      }
  });

  it('6.3.1 JSON-LD Production - When serializing a JSON-LD ' +
    'representation of a DID document, a conforming producer MUST specify a ' +
    'media type of application/did+ld+json to downstream applications such ' +
    'as described in § 7.1.2 DID Resolution Metadata.', async () => {
      const {contentType} = resolutionResult.didResolutionMetadata;
      expect(contentType).toBe('application/did+ld+json');
  });
}

const didJsonldProductionTests = (suiteConfig) => {
  describe('6.3.1 JSON-LD Production', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(mediaType === 'application/did+ld+json') {
            const {didDocumentDataModel} = suiteConfig[did];
            didDocumentDataModel.representationSpecificEntries =
              resolutionResult.didDocumentDataModel.
              representationSpecificEntries;

            generateJsonldProductionTests(
              {did, didDocumentDataModel, resolutionResult});
          }
        }
      });
    });
  });
};

module.exports = { didJsonldProductionTests };
