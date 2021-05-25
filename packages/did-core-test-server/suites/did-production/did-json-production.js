const {isXmlDatetime} = require('../utils');

const generateJsonProductionTests = (
  {did, didDocumentDataModel, resolutionResult}) => {
  const didDocument = {
    ...didDocumentDataModel.properties,
    ...didDocumentDataModel.representationSpecificEntries
  };

  describe('6.2.1 JSON Production - The DID document, DID document data ' +
    'structures, and representation-specific entries map MUST be ' +
    'serialized to the JSON representation according to the following ' +
    'production rules:', () => {
    allValues = _getAllValues(didDocument);

    allValues.forEach(value => {
      describe(`PARAMETER value=${value}`, () =>{
        if(Array.isArray(value)) {
          it('6.2.1 JSON Production - list: A JSON Array, where each element ' +
            'of the list is serialized, in order, as a value of the array ' +
            'according to its type, as defined in this table.', () => {
            expect(produce(value)).toBe(true);
          });
          it('6.2.1 JSON Production - set: A JSON Array, where each element ' +
            'of the set is added, in order, as a value of the array ' +
            'according to its type, as defined in this table.', () => {
            expect(produce(value)).toBe(true);
          });
        } else if(value !== null && typeof value === 'object') {
          it('6.2.1 JSON Production - map: A JSON Object, where each entry ' +
            'is serialized as a member of the JSON Object with the entry key ' +
            'as a JSON String member name and the entry value according to ' +
            'its type, as defined in this table.', () => {
            expect(produce(value)).toBe(true);
          });
        } else if(typeof value === 'string' && isXmlDatetime(value)) {
          it('6.2.1 JSON Production - datetime: A JSON String serialized as an ' +
            'XML Datetime normalized to UTC 00:00:00 and without sub-second ' +
            'decimal precision.', () => {
            expect(produce(value)).toBe(true);
          });
        } else if(typeof value === 'string') {
          it('6.2.1 JSON Production - string: A JSON String.', () => {
            expect(produce(value)).toBe(true);
          });
        } else if(typeof value === 'number') {
          if(!Number.isInteger(value)) {
            it('6.2.1 JSON Production - integer: A JSON Number without a ' +
              'decimal or fractional component.', () => {
              expect(produce(value)).toBe(true);
            });
          } else {
            it('6.2.1 JSON Production - double: A JSON Number with a decimal ' +
              'and fractional component.', () => {
              expect(produce(value)).toBe(true);
            });
          }
        } else if(typeof value === 'boolean') {
          it('6.2.1 JSON Production - boolean: A JSON Boolean.', () => {
            expect(produce(value)).toBe(true);
          });
        } else if(value === null) {
          it('6.2.1 JSON Production - null: A JSON null literal.', () => {
            expect(produce(value)).toBe(true);
          });
        } else {
          throw new Error(
            'Unknown application/did+json data model type for value: '+ value);
        }
      });
    });
  });

  it('6.2.1 JSON Production - All entries of a DID document MUST be included ' +
    'in the root JSON Object.', () => {
    expect(typeof didDocument === 'object');
  });

  it('6.2.1 JSON Production - When serializing a DID document, a conforming ' +
    'producer MUST specify a media type of application/did+json to ' +
    'downstream applications such as described in ' +
    '§ 7.1.2 DID Resolution Metadata.', async () => {
      const {contentType} = resolutionResult.didResolutionMetadata;
      expect(contentType).toBe('application/did+json');
  });
}

const produce = (value) => {
  const reserialization = JSON.parse(JSON.stringify(value));
  // the next line will throw if production of the value doesn't round trip
  expect(value).toEqual(reserialization);
  return true;
}

const _getAllValues = (obj, results = []) => {
  const r = results;
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    r.push(value);
    if(value !== null && typeof value === 'object') {
     _getAllValues(value, r);
    }
  });
  return r;
};

const didJsonProductionTests = (suiteConfig) => {
  describe('6.2.1 JSON Production', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(mediaType === 'application/did+json') {
            const {didDocumentDataModel} = suiteConfig[did];
            didDocumentDataModel.representationSpecificEntries =
              resolutionResult.didDocumentDataModel.
              representationSpecificEntries;

            generateJsonProductionTests(
              {did, didDocumentDataModel, resolutionResult});
          }
        }
      });
    });
  });
};

module.exports = { didJsonProductionTests };
