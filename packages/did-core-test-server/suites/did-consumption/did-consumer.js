// https://w3c.github.io/did-spec-registries/#representation-specific-entries
const knownRepresentationSpecificEntries = {
  "@context": true
};

// https://www.w3.org/TR/did-core/#did-syntax
const didRe = /^did:[a-z0-9]+:(?:[0-9a-zA-Z._:-]|%[0-9a-fA-F][0-9a-fA-F])*(?:[0-9a-zA-Z._-]|%[0-9a-fA-F][0-9a-fA-F])$/;

const parseRepresentation = (representation, mediaType) => {
  switch (mediaType) {
    case "application/did+json":
    case "application/did+ld+json":
      return JSON.parse(representation);
    case "application/did+cbor":
      // TODO: parse CBOR
    default:
      throw new Error('Unknown Media Type: ' + mediaType);
  }
};

const isNonConformingDid = (did) => {
  return !didRe.test(did);
}

const isNonConformingDidDocument = (didDocument) => {
  // didDocument: DID Document data model + representation-specific entries
  if (typeof didDocument.id !== 'string') {
    return false;
  }
  // TODO: test more of DID Document conformance
}

const didConsumerTests = (suiteConfig) => {
  let representationSpecificEntryDetected = false;
  let producedErrorOnNonConformingDIDDocument = false;

  const consumerCases = suiteConfig.conformingConsumers;
  if (!consumerCases) {
    return;
  }
  consumerCases.forEach((consumerCase) => {
    describe(consumerCase.name, () => {
      const { representation, mediaType, options } = consumerCase.input;
      const { didDocumentDataModel, representationSpecificEntries, errors } = consumerCase.output;

      it('6.1 Production and Consumption - A conforming consumer MUST take a representation and Media Type string as input into the consumption process. A conforming consumer MAY accept additional options as input into the consumption process.', async () => {
        expect(representation).toBeDefined();
        expect(mediaType).toBeDefined();
        // Additional options may be in consumerCase.input.options.
      });

      const entries = parseRepresentation(representation, mediaType);
      it('6.1 Production and Consumption - A conforming consumer MUST determine the representation of a DID document using the Media Type input string.', async () => {
        expect(entries).toBeDefined();
      });

      it('6.1 Production and Consumption - A conforming consumer MUST detect any representation-specific entry across all known representations and place the entry into a representation-specific entries map which is returned after the consumption process completes. A list of all known representation-specific entries is available in the DID Specification Registries [DID-SPEC-REGISTRIES].', async () => {
        let foundRepresentationSpecificEntries = {}
        for (const name in knownRepresentationSpecificEntries) {
          if (name in entries) {
            foundRepresentationSpecificEntries[name] = entries[name];
          }
        }
        expect(representationSpecificEntries).toEqual(foundRepresentationSpecificEntries);
      });

      it('6.1 Production and Consumption - A conforming consumer MUST produce errors when consuming non-conforming DIDs or DID documents.', async () => {
        const did = entries.id;
        if (isNonConformingDid(did)) {
          expect(errors.length).toBeGreaterThan(0);
        }
        if (isNonConformingDidDocument(entries)) {
          expect(errors.length).toBeGreaterThan(0);
        }
      });

      it('6.1 Production and Consumption - A conforming consumer MUST add all non-representation-specific entries that do not have explicit processing rules for the representation being consumed to the DID document data model using only the representation\'s data type processing rules and return the DID document data model after the consumption process completes.', async () => {
        let dataModel = {};
        for (const name in entries) {
          if (!knownRepresentationSpecificEntries[name]) {
            dataModel[name] = entries[name];
          }
        }
        expect(didDocumentDataModel).toEqual(dataModel);
      });
    });
  });
};
module.exports = { didConsumerTests };
