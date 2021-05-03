const isErrorExpectedOutcome = require('./utils').isErrorExpectedOutcome;
const parseDidMethod = require('./utils').parseDidMethod;
const produceRepresentation = require('./utils').produceRepresentation;
const consumeRepresentation = require('./utils').consumeRepresentation;
const expectMediaType = require('./utils').expectMediaType;
const expectConformantDidDocument = require('./utils').expectConformantDidDocument;
const expectConformantMetadataStructure = require('./utils').expectConformantMetadataStructure;
const expectKnownConformantMediaType = require('./utils').expectKnownConformantMediaType;
const expectConformantRepresentation = require('./utils').expectConformantRepresentation;

const didResolutionTests = (execution, expectedOutcome) => {
  const { did, resolutionOptions } = execution.input;
  const { didResolutionMetadata, didDocument, didDocumentStream, didDocumentMetadata } = execution.output;
  describe(did + ' (expected outcome: ' + expectedOutcome + ')', () => {
    it.todo('All conformant DID resolvers MUST implement the DID resolution functions for at least one DID method and MUST be able to return a DID document in at least one conformant representation.');
    describe('did', () => {
      it('This input is REQUIRED and the value MUST be a conformant DID as defined in § 3.1 DID Syntax.', async () => {
        expect(did).not.toBeFalsy();
        if (! didResolutionMetadata.hasOwnProperty('error') || didResolutionMetadata['error'] !== 'invalidDid') {
          expect(did).toBeValidDid();
        }
      });
    });
    describe('resolutionOptions', () => {
      it('A metadata structure.', async () => {
        expectConformantMetadataStructure(resolutionOptions);
      });
      it('This input is REQUIRED, but the structure MAY be empty.', async () => {
        expect(resolutionOptions).not.toBeFalsy();
      });
    });
    describe('didResolutionMetadata', () => {
      it('A metadata structure.', async () => {
        expectConformantMetadataStructure(didResolutionMetadata);
      });
      it('This structure is REQUIRED, and in the case of an error in the resolution process, this MUST NOT be empty.', async () => {
        expect(didResolutionMetadata).not.toBeFalsy();
        if (isErrorExpectedOutcome(expectedOutcome)) {
          expect(Object.keys(didResolutionMetadata)).not.toHaveLength(0);
        }
      });
      it('If resolveRepresentation was called, this structure MUST contain a contentType property containing the Media Type of the representation found in the didDocumentStream.', async () => {
        if (execution.function === 'resolveRepresentation') {
          expect(Object.keys(didResolutionMetadata)).toContain('contentType');
          expectMediaType(didResolutionMetadata['contentType']);
          expectKnownConformantMediaType(didResolutionMetadata['contentType']);
          expectConformantRepresentation(didResolutionMetadata['contentType'], didDocumentStream);
        }
      });
      it('If the resolution is not successful, this structure MUST contain an error property describing the error.', async () => {
        if (isErrorExpectedOutcome(expectedOutcome)) {
          expect(Object.keys(didResolutionMetadata)).toContain('error');
          expect(didResolutionMetadata['error']).toBeTruthy();
        }
      });
    });
    // Only test 'didDocument' if 'resolve' was called, and if resolution was successful.
    if (execution.function === 'resolve') {
      describe('didDocument', () => {
        it('If the resolution is successful, and if the resolve function was called, this MUST be a DID document abstract data model (a map) as described in § 4. Data Model that is capable of being transformed into a conforming DID Document (representation), using the production rules specified by the representation.', async () => {
          if (! didResolutionMetadata.hasOwnProperty('error')) {
            expect(typeof didDocument).toBe('object');
            expectConformantDidDocument(didDocument);
          }
          // TODO: Test if the DID document abstract data model is capable of being transformed into a conforming DID Document (representation).
          //       This should re-use code from other tests (production).
        });
        it('The value of id in the resolved DID document MUST match the DID that was resolved.', async () => {
          if (! didResolutionMetadata.hasOwnProperty('error')) {
            // remove any query string in the DID uri
            const expectedId = did.split('?')[0]
            expect(didDocument['id']).toBe(expectedId);
          }
        });
        it('If the resolution is unsuccessful, this value MUST be empty.', async () => {
          if (didResolutionMetadata.hasOwnProperty('error')) {
            expect(didDocument).toBeFalsy();
          }
        });
      });
    }
    // Only test 'didDocumentStream' if 'resolveRepresentation' was called.
    if (execution.function === 'resolveRepresentation') {
      describe('didDocumentStream', () => {
        it('If the resolution is successful, and if the resolveRepresentation function was called, this MUST be a byte stream of the resolved DID document in one of the conformant representations.', async () => {
          if (! didResolutionMetadata.hasOwnProperty('error')) {
            expect(didDocumentStream).not.toBeFalsy();
            expectMediaType(didResolutionMetadata['contentType']);
            expectKnownConformantMediaType(didResolutionMetadata['contentType']);
            expectConformantRepresentation(didResolutionMetadata['contentType'], didDocumentStream);
          }
        });
        it('If the resolution is unsuccessful, this value MUST be an empty stream.', async () => {
          if (didResolutionMetadata.hasOwnProperty('error')) {
            expect(didDocumentStream).toBe('');
          }
        });
      });
    }
    describe('didDocumentMetadata', () => {
      it('If the resolution is successful, this MUST be a metadata structure.', async () => {
        if (! didResolutionMetadata.hasOwnProperty('error')) {
          expectConformantMetadataStructure(didDocumentMetadata);
        }
      });
      it('If the resolution is unsuccessful, this output MUST be an empty metadata structure.', async () => {
        if (didResolutionMetadata.hasOwnProperty('error')) {
          expectConformantMetadataStructure(didDocumentMetadata);
          expect(Object.keys(didDocumentMetadata)).toHaveLength(0);
        }
      });
    });
    describe('DID Resolution Options', () => {
      describe('accept', () => {
        if (resolutionOptions.hasOwnProperty('accept')) {
          it('The Media Type of the caller\'s preferred representation of the DID document.', async () => {
            expectMediaType(resolutionOptions['accept']);
          });
          it('The Media Type MUST be expressed as an ASCII string.', async () => {
            expect(resolutionOptions['accept']).toBeAsciiString();
          });
        }
        it('This property is OPTIONAL for the resolveRepresentation function and MUST NOT be used with the resolve function.', async () => {
          if (execution.function === 'resolve') {
            expect(Object.keys(resolutionOptions)).not.toContain('accept');
          }
        });
      });
    });
    describe('DID Resolution Metadata', () => {
      describe('contentType', () => {
        it('This property is REQUIRED if resolution is successful and if the resolveRepresentation function was called.', async() => {
          if (! didResolutionMetadata.hasOwnProperty('error') && execution.input.function === 'resolveRepresentation') {
            expect(Object.keys(didResolutionMetadata)).toContain('contentType');
          }
        });
        it('This property MUST NOT be present if the resolve function was called.', async () => {
          if (execution.input.function === 'resolve') {
            expect(Object.keys(didResolutionMetadata)).not.toContain('contentType');
          }
        });
        if (didResolutionMetadata.hasOwnProperty('contentType')) {
          it('The value of this property MUST be an ASCII string that is the Media Type of the conformant representations.', async () => {
              expect(didResolutionMetadata['contentType']).toBeAsciiString();
              expectMediaType(didResolutionMetadata['contentType']);
              expectKnownConformantMediaType(didResolutionMetadata['contentType']);
          });
        }
        it('The caller of the resolveRepresentation function MUST use this value when determining how to parse and process the didDocumentStream returned by this function into the data model.', async() => {
          // TODO: This should re-use code from other tests (consumption).
        });
      });
      describe('error', () => {
        it('This property is REQUIRED when there is an error in the resolution process.', async () => {
          if (isErrorExpectedOutcome(expectedOutcome)) {
            expect(Object.keys(didResolutionMetadata)).toContain('error');
          }
        });
        if (didResolutionMetadata.hasOwnProperty('error')) {
          it('The value of this property MUST be a single keyword ASCII string.', async () => {
            expect(didResolutionMetadata['error']).toBeAsciiString();
            expect(didResolutionMetadata['error']).not.toMatch('\\s');
          });
        }
        if (expectedOutcome === 'invalidDidErrorOutcome') {
          it('invalidDid - The DID supplied to the DID resolution function does not conform to valid syntax.', async () => {
            expect(didResolutionMetadata['error']).toBe('invalidDid');
            expect(did).not.toBeValidDid();
            expect(didDocument).toBeFalsy();
          });
        }
        if (expectedOutcome === 'notFoundErrorOutcome') {
          it('notFound - The DID resolver was unable to find the DID document resulting from this resolution request.', async() => {
            expect(didResolutionMetadata['error']).toBe('notFound');
            expect(didDocument).toBeFalsy();
          });
        }
        if (expectedOutcome === 'representationNotSupportedErrorOutcome') {
          it('representationNotSupported - This error code is returned if the representation requested via the accept input metadata property is not supported by the DID method and/or DID resolver implementation.', async() => {
            expect(didResolutionMetadata['error']).toBe('representationNotSupported');
          });
        }
      });
    });
    describe('DID Document Metadata', () => {
      describe('created', () => {
        if (didDocumentMetadata.hasOwnProperty('created')) {
          it('The value of the property MUST be a string formatted as an XML Datetime normalized to UTC 00:00:00 and without sub-second decimal precision.', async () => {
            expect(didDocumentMetadata['created']).toBeDidCoreDatetime();
          });
        }
      });
      describe('updated', () => {
        if (didDocumentMetadata.hasOwnProperty('updated')) {
          it('The value of the property MUST follow the same formatting rules as the created property.', async () => {
            expect(didDocumentMetadata['updated']).toBeDidCoreDatetime();
          });
          if (didDocumentMetadata.hasOwnProperty('created')) {
            it('updated is later or equal than created.', async () => {
              expect((new Date(didDocumentMetadata['updated'])).getTime()).toBeGreaterThanOrEqual((new Date(didDocumentMetadata['created'])).getTime())
            });
          }
        }
      });
      describe('deactivated', () => {
        if (expectedOutcome === 'deactivatedOutcome') {
          it('If a DID has been deactivated, DID document metadata MUST include this property with the boolean value true.', async () => {
            expect(Object.keys(didDocumentMetadata)).toContain('deactivated');
            expect(didDocumentMetadata['deactivated']).toBe(true);
          });
        }
        if (expectedOutcome !== 'deactivatedOutcome') {
          if (didDocumentMetadata.hasOwnProperty('deactivated')) {
            it('If a DID has not been deactivated, this property is OPTIONAL, but if included, MUST have the boolean value false.', async () => {
              expect(didDocumentMetadata['deactivated']).toBe(false);
            });
          }
        }
      });
      describe('nextUpdate', () => {
        if (didDocumentMetadata.hasOwnProperty('nextUpdate')) {
          it('The value of the property MUST follow the same formatting rules as the created property.', async () => {
            expect(didDocumentMetadata['nextUpdate']).toBeDidCoreDatetime();
          });
          if (didDocumentMetadata.hasOwnProperty('created')) {
            it('nextUpdate is later than created.', async () => {
              expect((new Date(didDocumentMetadata['nextUpdate'])).getTime()).toBeGreaterThan((new Date(didDocumentMetadata['created'])).getTime())
            });
          }
          if (didDocumentMetadata.hasOwnProperty('updated')) {
            it('nextUpdate is later than updated.', async () => {
              expect((new Date(didDocumentMetadata['nextUpdate'])).getTime()).toBeGreaterThan((new Date(didDocumentMetadata['updated'])).getTime())
            });
          }
        }
      });
      describe('versionId', () => {
        if (didDocumentMetadata.hasOwnProperty('versionId')) {
          it('The value of the property MUST be an ASCII string.', async () => {
            expect(didDocumentMetadata['versionId']).toBeAsciiString();
          });
        }
      });
      describe('nextVersionId', () => {
        if (didDocumentMetadata.hasOwnProperty('nextVersionId')) {
          it('The value of the property MUST be an ASCII string.', async () => {
            expect(didDocumentMetadata['nextVersionId']).toBeAsciiString();
          });
          if (didDocumentMetadata.hasOwnProperty('versionId')) {
            it('nextVersionId is different from versionId.', async () => {
              expect(didDocumentMetadata['nextVersionId']).not.toBe(didDocumentMetadata['versionId']);
            });
          }
        }
      });
      describe('equivalentId', () => {
        // TODO: According to the spec, 'equivalentId' is currently not optional, even though that's definitely what the WG intended - see https://github.com/w3c/did-core/issues/717.
        if (didDocumentMetadata.hasOwnProperty('equivalentId')) {
          it('The value of equivalentId MUST be a set where each item in the list is a string that conforms to the rules in Section § 3.1 DID Syntax.', async () => {
            expect(typeof didDocumentMetadata['equivalentId']).toBe('array');
            didDocumentMetadata['equivalentId'].forEach((i) => {
              const equivalentid = didDocumentMetadata['equivalentId'][i];
              expect(equivalentid).toBeValidDid();
            })
          });
          it('Each equivalentId DID value MUST be produced by, and a form of, the same DID Method as the id property value.', async () => {
            didDocumentMetadata['equivalentId'].forEach((i) => {
              const equivalentid = didDocumentMetadata['equivalentId'][i];
              // TODO: This will currently only work if the 'resolve' function is called, not 'resolveRepresentation'.
              expect(parseDidMethod(equivalentid)).toBe(parseDidMethod(didDocument['id']));
            })
          });
          // As discussed on the 2021-04-13 DID WG topic call, the following test can be skipped (see https://www.w3.org/2019/did-wg/Meetings/Minutes/2021-04-13-did-topic)
          it.skip('A conforming DID Method specification MUST guarantee that each equivalentId value is logically equivalent to the id property value.');
          // As discussed on the 2021-04-13 DID WG topic call, the following test can be skipped (see https://www.w3.org/2019/did-wg/Meetings/Minutes/2021-04-13-did-topic)
          it.skip('equivalentId is a much stronger form of equivalence than alsoKnownAs because the equivalence MUST be guaranteed by the governing DID method.');
        }
      });
      describe('canonicalId', () => {
        // TODO: According to the spec, 'canonicalId' is currently not optional, even though that's definitely what the WG intended - see https://github.com/w3c/did-core/issues/717.
        if (didDocumentMetadata.hasOwnProperty('canonicalId')) {
          it('The value of canonicalId MUST be a string that conforms to the rules in Section § 3.1 DID Syntax.', async () => {
            const canonicalId = didDocumentMetadata['canonicalId'][i];
            expect(didDocumentMetadata['canonicalId']).toBeValidDid();
          });
          it('A canonicalId value MUST be produced by, and a form of, the same DID Method as the id property value.', async () => {
            // TODO: This will currently only work if the 'resolve' function is called, not 'resolveRepresentation'.
            expect(parseDidMethod(didDocumentMetadata['canonicalId'])).toBe(parseDidMethod(didDocument['id']));
          });
          // As discussed on the 2021-04-13 DID WG topic call, the following test can be skipped (see https://www.w3.org/2019/did-wg/Meetings/Minutes/2021-04-13-did-topic)
          it.skip('A conforming DID Method specification MUST guarantee that the canonicalId value is logically equivalent to the id property value.');
        }
      });
    });
  });
};

module.exports = { didResolutionTests };
