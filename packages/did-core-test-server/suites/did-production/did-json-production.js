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

  it('6.2.1 JSON Production - When serializing a JSON ' +
    'representation of a DID document, a conforming producer MUST specify a ' +
    'media type of application/did+json to downstream applications such ' +
    'as described in § 7.1.2 DID Resolution Metadata.', async () => {
      const {contentType} = resolutionResult.didResolutionMetadata;
      expect(contentType).toBe('application/did+json');
  });

  it('6.2.1 JSON Production - DID Documents MUST have an id property, ' +
    'and they MUST be strings:', async () => {
    expect(typeof didDocument.id).toBe('string');
  });

  it('6.2.1 JSON Production - the JSON representation should only parse ' +
    'known properties, and should ensure they are populated with allowed ' +
    'value types, per section 6.2 JSON', async () => {

      // only operate on known properties, and discard any unknown props
      for (let prop in didDocument) {

        switch (prop){

          case 'controller':
            expect(
              typeof didDocument.controller === 'string' || 
              Array.isArray(didDocument.controller)
            ).toBe(true);
          break;

          case 'alsoKnownAs':
            let alsoKnownAs = didDocument.alsoKnownAs;
            expect(
              typeof alsoKnownAs === 'string' || 
              (Array.isArray(alsoKnownAs) && alsoKnownAs.every(entry => typeof entry === 'string'))
            ).toBe(true);
          break;

          case 'service':
            expect(
              Array.isArray(didDocument.service) && 
              didDocument.service.every(entry => typeof entry === 'object' && !Array.isArray(entry))
            ).toBe(true);
          break;

          case 'verificationMethod':
            expect(
              Array.isArray(didDocument.verificationMethod) && 
              didDocument.verificationMethod.every(entry => typeof entry === 'object' && !Array.isArray(entry))
            ).toBe(true);
          break;

          case 'authentication':
          case 'assertionMethod':
          case 'keyAgreement':
          case 'capabilityInvocation':
          case 'capabilityDelegation':
            expect(Array.isArray(didDocument[prop]) && didDocument.every(entry => {
              return typeof entry === 'string' || (typeof entry === 'object' && !Array.isArray(entry))
            })).toBe(true);
          break;

          default:
            console.log(`This is plain JSON, baby - I refuse to touch your unknown '${prop}' property!`)
        }

      }
  });

};

module.exports = { generateJsonProductionTests };
