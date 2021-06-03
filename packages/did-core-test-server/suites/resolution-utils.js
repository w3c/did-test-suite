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

const findExecutionByDid = ((implementation, did) => {
  implementation.executions.forEach((execution) => {
    if (execution.input.did == did) {
      return execution;
    }
  });
});

const findExecutionByDidUrl = ((implementation, didUrl) => {
  var found;
  implementation.executions.forEach((execution) => {
    if (execution.input.didUrl === didUrl) {
      found = execution;
      return;
    }
  });
  return found;
});

const parseDidMethod = (did) => {
  var res = did.split(":");
  return res[1];
};

const produceRepresentation = (didDocument, contentType) => {
  // TODO: improve this by re-using other test code
  if (contentType.startsWith('application/did+json') ||
      contentType.startsWith('application/did+ld+json')) {
    return JSON.stringify(didDocument);
  } else if (contentType.startsWith('application/did+cbor')) {
    return '00';
  }
};

const consumeRepresentation = (representation, contentType) => {
  // TODO: improve this by re-using other test code
  if (contentType.startsWith('application/did+ld+json')) {
    let didDocument = JSON.parse(representation);
    expect(Object.keys(didDocument)).toContain('@context');
    return didDocument;
  } else if (contentType.startsWith('application/did+json')) {
    let didDocument = JSON.parse(representation);
    return didDocument;
  } else if (contentType.startsWith('application/did+cbor')) {
    expect(parseInt('0x' + representation)).not.toBeNaN();
    let didDocument = { 'id': 'did:ex:123' };
    return didDocument;
  }
};

const expectConformantDidDocument = ((didDocument) => {
  // TODO: improve this by re-using other test code
  expect(didDocument).toBeInfraMap();
  expect(Object.keys(didDocument)).toContain('id');
});

const expectConformantDidDocumentRepresentation = ((didDocumentStream, contentType) => {
  // TODO: improve this by re-using other test code
  const didDocument = consumeRepresentation(didDocumentStream, contentType);
  expect(didDocument).not.toBeFalsy();
  expectConformantDidDocument(didDocument);
});

const expectConformantMetadataStructure = ((metaDataStructure) => {
  // TODO: improve this by re-using other test code
  expect(metaDataStructure).toBeInfraMap();
});

module.exports = {
  findExpectedOutcome,
  isErrorExpectedOutcome,
  findExecutionByDid,
  findExecutionByDidUrl,
  parseDidMethod,
  produceRepresentation,
  consumeRepresentation,
  expectConformantDidDocument,
  expectConformantDidDocumentRepresentation,
  expectConformantMetadataStructure
};
