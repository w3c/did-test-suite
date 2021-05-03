const findExpectedOutcome = ((expectedOutcomes, i) => {
  const expectedOutcomesArray = [];
  Object.keys(expectedOutcomes).forEach((expectedOutcome) => {
        expectedOutcomes[expectedOutcome].forEach((expectedOutcomeIndex) => {
          expectedOutcomesArray[expectedOutcomeIndex] = expectedOutcome;
        });
      });
  return expectedOutcomesArray[i];
});

const isErrorExpectedOutcome = ((expectedOutcome) => {
  return expectedOutcome.endsWith('ErrorOutcome');
});

const parseDidMethod = (did) => {
  var match = /^did:(.+):(.+)$/.exec(did);
  return match[1];
};

const produceRepresentation = (didDocument) => {
  // TODO: properly produce, try to re-use other test code
  return JSON.stringify(didDocument);
};

const consumeRepresentation = (representation) => {
  // TODO: properly consume, try to re-use other test code
  return JSON.parse(representation);
};

const expectXmlDateTimeNormalizedToUtcWithoutPrecision = (xmlDateTime, not) => {
  (not ? expect(xmlDateTime).not : expect(xmlDateTime))
      .toMatch(/^([0-9]{4})-([0-1][0-9])-([0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9](Z))$/);
}

const expectMediaType = (mediaType, not) => {
  (not ? expect(mediaType).not : expect(mediaType))
      .toMatch(/^\w+\/[-+.\w]+/);
};

const expectConformantDidDocument = ((didDocument, not) => {
  // TODO: properly test if this is a conformant DID document (abstract data model)
  (not ? expect(Object.keys(didDocument)).not : expect(Object.keys(didDocument)))
      .toContain('id');
});

const expectConformantMetadataStructure = ((metaDataStructure, not) => {
  // TODO: properly test if this is a conformant metadata structure, try to re-use other test code
  (not ? expect(typeof metaDataStructure).not : expect(typeof metaDataStructure))
      .toBe('object');
});

const expectKnownConformantMediaType = ((mediaType) => {
  expect(mediaType.startsWith('application/did+ld+json') ||
      mediaType.startsWith('application/did+json') ||
      mediaType.startsWith('application/did+cbor')).toBe(true);
});

const expectConformantRepresentation = ((mediaType, representation) => {
  // TODO: properly test if the representation conforms to the mediaType, try to re-use other test code
  if (mediaType.startsWith('application/did+ld+json')) {
    expect(() => { JSON.parse(representation); }).not.toThrow();
    expect(Object.keys(JSON.parse(representation))).constructor('@context');
  } else if (mediaType.startsWith('application/did+json')) {
    expect(() => { JSON.parse(representation); }).not.toThrow();
  } else if (mediaType.startsWith('application/did+cbor')) {
    expect(parseInt('0x' + representation)).not.toBeNaN();
  }
});

module.exports = {
  findExpectedOutcome,
  isErrorExpectedOutcome,
  parseDidMethod,
  produceRepresentation,
  consumeRepresentation,
  expectXmlDateTimeNormalizedToUtcWithoutPrecision,
  expectMediaType,
  expectConformantDidDocument,
  expectConformantMetadataStructure,
  expectKnownConformantMediaType,
  expectConformantRepresentation
};
