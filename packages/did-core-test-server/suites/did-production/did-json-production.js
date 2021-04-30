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

  it('6.2.1 JSON Production - If known properties are present, they MUST be' +
  'of the correct value types/formats described in the § 6.2.1 JSON ' +
  'Representation Type table.', async () => {

    expect(typeof didDocument.id).toBe('string');

    if ('controller' in didDocument) {
      expect(typeof didDocument.controller === 'string' || Array.isArray(didDocument.controller)).toBe(true);
    }

    if ('alsoKnownAs' in didDocument) {
      let alsoKnownAs = didDocument.alsoKnownAs;
      expect(
        typeof alsoKnownAs === 'string' || 
        (Array.isArray(alsoKnownAs) && alsoKnownAs.every(entry => typeof entry === 'string'))
      ).toBe(true);
    }

    if ('service' in didDocument) {
      expect(
        Array.isArray(didDocument.service) && 
        didDocument.service.every(entry => typeof entry === 'object' && !Array.isArray(entry))
      ).toBe(true);
    }

    if ('verificationMethod' in didDocument) {
      expect(
        Array.isArray(didDocument.verificationMethod) && 
        didDocument.verificationMethod.every(entry => typeof entry === 'object' && !Array.isArray(entry))
      ).toBe(true);
    }

    let relationshipsAreLookinAllGoodInDaHood = [
      'authentication',
      'assertionMethod',
      'keyAgreement',
      'capabilityInvocation',
      'capabilityDelegation',
    ].every(prop => {
      return prop in didDocument ? 
        Array.isArray(didDocument[prop]) && didDocument.every(entry => {
          return typeof entry === 'string' || (typeof entry === 'object' && !Array.isArray(entry))
        }) : 
        true;
    })

    expect(relationshipsAreLookinAllGoodInDaHood).toBe(true);
  });

};

module.exports = { generateJsonProductionTests };
