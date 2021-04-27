const deepEqual = require('deep-equal')

const generateJsonProductionTests = ({did, didDocumentDataModel, resolutionResult}) => {
  
  const didDocument = {
    ...didDocumentDataModel.properties,
    ...didDocumentDataModel.representationSpecificEntries
  };

  it('6.2.1 JSON Production - The DID document and any DID document ' +
    'data structures expressed by the data model MUST be serialized to the ' +
    'JSON representation according to the JSON representation production ' +
    'rules as defined in § 6.2 JSON.', async () => {
      reserializedDidDocument = JSON.parse(JSON.stringify(didDocument));
      expect(deepEqual(didDocument, reserializedDidDocument)).toBe(true);
  });

  it('6.2.1 JSON Production - When serializing a JSON-LD ' +
    'representation of a DID document, a conforming producer MUST specify a ' +
    'media type of application/did+json to downstream applications such ' +
    'as described in § 7.1.2 DID Resolution Metadata.', async () => {
      const {contentType} = resolutionResult.didResolutionMetadata;
      expect(contentType).toBe('application/did+json');
  });

  // if (suiteConfig.supportedContentTypes.includes('application/did+json')) {
  //   describe('6.2.1 JSON Production', () => {
  //     it.todo(
  //       'Numeric values representable as IEEE754 MUST be represented as a Number type.'
  //     );
  //     it.todo('Boolean values MUST be represented as a Boolean literal.');
  //     it.todo('Sequence value MUST be represented as an Array type.');
  //     it.todo('Unordered sets of values MUST be represented as an Array type.');
  //     it.todo('Sets of properties MUST be represented as an Object type.');
  //     it.todo('Empty values MUST be represented as a null literal.');
  //   });
  // }
};

module.exports = { generateJsonProductionTests };
