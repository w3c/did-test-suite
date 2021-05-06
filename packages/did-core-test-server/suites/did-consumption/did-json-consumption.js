const {isXmlDatetime} = require('../utils');

const generateJsonConsumptionTests = (
  {did, didDocumentDataModel, resolutionResult}) => {
  const {representation} = resolutionResult;
  const didDocument = JSON.parse(representation);

  describe('6.2.2 JSON Consumption - The DID document and DID document ' +
    'data structures JSON representation MUST be deserialized into the ' +
    'data model according to the following consumption rules:', () => {
    allValues = _getAllValues(didDocument);

    allValues.forEach(value => {
      if(Array.isArray(value)) {
        it('6.2.2 JSON Consumption - JSON Array where the data model entry ' +
          'value is a list or unknown: A list, where each value of the JSON ' +
          'Array is added to the list in order, converted based on the JSON ' +
          'representation type of the array value, as defined in this ' +
          'table.', () => {
          expect(consume(value)).toBe(true);
        });
        it('6.2.2 JSON Consumption - JSON Array where the data model entry ' +
          'value is a set: A set, where each value of the JSON Array is ' +
          'added to the set in order, converted based on the JSON ' +
          'representation type of the array value, as defined in this ' +
          'table.', () => {
          expect(consume(value)).toBe(true);
        });
      } else if(value !== null && typeof value === 'object') {
        it('6.2.2 JSON Consumption - JSON Object: A map, where each member ' +
          'of the JSON Object is added as an entry to the map. Each entry ' +
          'key is set as the JSON Object member name. Each entry value is ' +
          'set by converting the JSON Object member value according to the ' +
          'JSON representation type as defined in this table. Since order ' +
          'is not specified by JSON Objects, no insertion order is ' +
          'guaranteed.', () => {
          expect(consume(value)).toBe(true);
        });
      } else if(typeof value === 'string' && isXmlDatetime(value)) {
        it('6.2.2 JSON Consumption - JSON String where data model entry ' +
          'value is a datetime: A datetime.', () => {
          expect(consume(value)).toBe(true);
        });
      } else if(typeof value === 'string') {
        it('6.2.2 JSON Consumption - JSON String, where the data model ' +
          'entry value type is string or unknown: A string.', () => {
          expect(consume(value)).toBe(true);
        });
      } else if(typeof value === 'number') {
        if(!Number.isInteger(value)) {
          it('6.2.2 JSON Consumption - JSON Number without a decimal or ' +
            'fractional component: An integer.', () => {
            expect(consume(value)).toBe(true);
          });
        } else {
          it('6.2.2 JSON Consumption - JSON Number with a decimal and ' +
            'fractional component, or when entry value is a double ' +
            'regardless of inclusion of fractional component: ' +
            'A double.', () => {
            expect(consume(value)).toBe(true);
          });
        }
      } else if(typeof value === 'boolean') {
        it('6.2.2 JSON Consumption - JSON Boolean: A boolean.', () => {
          expect(consume(value)).toBe(true);
        });
      } else if(value === null) {
        it('6.2.2 JSON Consumption - JSON null literal: A null value.', () => {
          expect(consume(value)).toBe(true);
        });
      } else {
        throw new Error(
          'Unknown application/did+json data model type for value: '+ value);
      }
    });
  });

  it('6.2.2 JSON Consumption - A conforming consumer for a JSON ' +
    'representation that is consuming a DID document with a root ' +
    'element that is not a JSON Object MUST report an error.', () => {
    expect(typeof didDocument === 'object').toBeTruthy();
  });

  it('6.2.2 JSON Production - If media type information is available to ' +
    'a conforming consumer and the media type value is ' +
    'application/did+json, then the data structure being consumed is a ' +
    'DID document, and the root element MUST be a JSON Object where all ' +
    'members of the object are entries of the DID document.', async () => {
      const {contentType} = resolutionResult.didResolutionMetadata;
      expect(contentType).toBe('application/did+json');
  });
}

const consume = (value) => {
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

const didJsonConsumptionTests = (suiteConfig) => {
  describe('6.2.2 JSON Consumption', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(mediaType === 'application/did+json') {
            const {didDocumentDataModel} = suiteConfig[did];
            didDocumentDataModel.representationSpecificEntries =
              resolutionResult.didDocumentDataModel.
              representationSpecificEntries;

            generateJsonConsumptionTests(
              {did, didDocumentDataModel, resolutionResult});
          }
        }
      });
    });
  });
};

module.exports = { didJsonConsumptionTests };
