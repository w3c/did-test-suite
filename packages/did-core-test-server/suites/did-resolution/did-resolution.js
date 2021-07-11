const utils = require('../resolution-utils');

const didResolutionTests = (execution, expectedOutcome, imp) => {
  const { did, resolutionOptions } = execution.input;
  const { didResolutionMetadata, didDocument, didDocumentStream, didDocumentMetadata } = execution.output;
  describe(did, () => {
    describe('PARAMETER expected outcome: ' + expectedOutcome, () => {
      it('7.1 DID Resolution - This input is REQUIRED and the value MUST be a conformant DID as defined in § 3.1 DID Syntax.', async () => {
        expect(did).not.toBeFalsy();
        if (! didResolutionMetadata.hasOwnProperty('error') || didResolutionMetadata['error'] !== 'invalidDid') {
          expect(did).toBeValidDid();
        }
      });
      describe('resolutionOptions', () => {
        it('7.1 DID Resolution - A metadata structure.', async () => {
          utils.expectConformantMetadataStructure(resolutionOptions);
        });
        it('7.1 DID Resolution - This input is REQUIRED, but the structure MAY be empty.', async () => {
          expect(resolutionOptions).not.toBeFalsy();
        });
      });
      describe('didResolutionMetadata', () => {
        it('7.1 DID Resolution - A metadata structure.', async () => {
          utils.expectConformantMetadataStructure(didResolutionMetadata);
        });
        it('7.1 DID Resolution - This structure is REQUIRED, and in the case of an error in the resolution process, this MUST NOT be empty.', async () => {
          expect(didResolutionMetadata).not.toBeFalsy();
          if (utils.isErrorExpectedOutcome(expectedOutcome)) {
            expect(Object.keys(didResolutionMetadata)).not.toHaveLength(0);
          }
        });
        it('7.1 DID Resolution - If resolveRepresentation was called, this structure MUST contain a contentType property containing the Media Type of the representation found in the didDocumentStream.', async () => {
          if (execution.function === 'resolveRepresentation') {
            expect(Object.keys(didResolutionMetadata)).toContain('contentType');
            expect(didResolutionMetadata['contentType']).toBeMediaType();
            utils.expectConformantDidDocumentRepresentation(didDocumentStream, didResolutionMetadata['contentType']);
          }
        });
        it('7.1 DID Resolution - If the resolution is not successful, this structure MUST contain an error property describing the error.', async () => {
          if (utils.isErrorExpectedOutcome(expectedOutcome)) {
            expect(Object.keys(didResolutionMetadata)).toContain('error');
            expect(didResolutionMetadata['error']).toBeTruthy();
          }
        });
      });
      // Only test 'didDocument' if 'resolve' was called, and if resolution was successful.
      if (execution.function === 'resolve') {
        describe('didDocument', () => {
          it('7.1 DID Resolution - If the resolution is successful, and if the resolve function was called, this MUST be a DID document abstract data model (a map) as described in § 4. Data Model that is capable of being transformed into a conforming DID Document (representation), using the production rules specified by the representation.', async () => {
            if (! didResolutionMetadata.hasOwnProperty('error')) {
              utils.expectConformantDidDocument(didDocument);
              const didDocumentStream = utils.produceRepresentation(didDocument, 'application/did+json');
              utils.expectConformantDidDocumentRepresentation(didDocumentStream, 'application/did+json');
            }
          });
          it('7.1 DID Resolution - The value of id in the resolved DID document MUST match the DID that was resolved.', async () => {
            if (! didResolutionMetadata.hasOwnProperty('error')) {
              // remove any query string in the DID uri
              const expectedId = did.split('?')[0]
              expect(didDocument['id']).toBe(expectedId);
            }
          });
          it('7.1 DID Resolution - If the resolution is unsuccessful, this value MUST be empty.', async () => {
            if (didResolutionMetadata.hasOwnProperty('error')) {
              expect(didDocument).toBeFalsy();
            }
          });
        });
      }
      // Only test 'didDocumentStream' if 'resolveRepresentation' was called.
      if (execution.function === 'resolveRepresentation') {
        describe('didDocumentStream', () => {
          it('7.1 DID Resolution - If the resolution is successful, and if the resolveRepresentation function was called, this MUST be a byte stream of the resolved DID document in one of the conformant representations.', async () => {
            if (! didResolutionMetadata.hasOwnProperty('error')) {
              expect(didDocumentStream).not.toBeFalsy();
              expect(didResolutionMetadata['contentType']).toBeMediaType();
              utils.expectConformantDidDocumentRepresentation(didDocumentStream, didResolutionMetadata['contentType']);
            }
          });
          it('7.1 DID Resolution - If the resolution is unsuccessful, this value MUST be an empty stream.', async () => {
            if (didResolutionMetadata.hasOwnProperty('error')) {
              expect(didDocumentStream).toBe('');
            }
          });
        });
      }
      describe('didDocumentMetadata', () => {
        it('7.1 DID Resolution - If the resolution is successful, this MUST be a metadata structure.', async () => {
          if (! didResolutionMetadata.hasOwnProperty('error')) {
            utils.expectConformantMetadataStructure(didDocumentMetadata);
          }
        });
        it('7.1 DID Resolution - If the resolution is unsuccessful, this output MUST be an empty metadata structure.', async () => {
          if (didResolutionMetadata.hasOwnProperty('error')) {
            utils.expectConformantMetadataStructure(didDocumentMetadata);
            expect(Object.keys(didDocumentMetadata)).toHaveLength(0);
          }
        });
      });
      describe('DID Resolution Options', () => {
        describe('accept', () => {
          if (resolutionOptions.hasOwnProperty('accept')) {
            it('7.1.1 DID Resolution Options - The Media Type of the caller\'s preferred representation of the DID document.', async () => {
              expect(resolutionOptions['accept']).toBeMediaType();
            });
            it('7.1.1 DID Resolution Options - The Media Type MUST be expressed as an ASCII string.', async () => {
              expect(resolutionOptions['accept']).toBeAsciiString();
            });
          }
          it('7.1.1 DID Resolution Options - This property is OPTIONAL for the resolveRepresentation function and MUST NOT be used with the resolve function.', async () => {
            if (execution.function === 'resolve') {
              expect(Object.keys(resolutionOptions)).not.toContain('accept');
            }
          });
        });
      });
      describe('DID Resolution Metadata', () => {
        describe('contentType', () => {
          it('7.1.2 DID Resolution Metadata - This property is REQUIRED if resolution is successful and if the resolveRepresentation function was called.', async() => {
            if (! didResolutionMetadata.hasOwnProperty('error') && execution.function === 'resolveRepresentation') {
              expect(Object.keys(didResolutionMetadata)).toContain('contentType');
            }
          });
          it('7.1.2 DID Resolution Metadata - This property MUST NOT be present if the resolve function was called.', async () => {
            if (execution.function === 'resolve') {
              expect(Object.keys(didResolutionMetadata)).not.toContain('contentType');
            }
          });
          if (didResolutionMetadata.hasOwnProperty('contentType')) {
            it('7.1.2 DID Resolution Metadata - The value of this property MUST be an ASCII string that is the Media Type of the conformant representations.', async () => {
                expect(didResolutionMetadata['contentType']).toBeAsciiString();
                expect(didResolutionMetadata['contentType']).toBeMediaType();
                utils.expectConformantDidDocumentRepresentation(didDocumentStream, didResolutionMetadata['contentType']);
            });
          }
          it('7.1.2 DID Resolution Metadata - The caller of the resolveRepresentation function MUST use this value when determining how to parse and process the didDocumentStream returned by this function into the data model.', async() => {
            if (didResolutionMetadata.hasOwnProperty('contentType')) {
              expect(didDocumentStream).not.toBeFalsy();
              expect(utils.consumeRepresentation(didDocumentStream, didResolutionMetadata['contentType'])).not.toBeFalsy();
              expect(utils.consumeRepresentation(didDocumentStream, 'image/jpeg')).toBeFalsy();
            }
          });
        });
        describe('error', () => {
          it('7.1.2 DID Resolution Metadata - This property is REQUIRED when there is an error in the resolution process.', async () => {
            if (utils.isErrorExpectedOutcome(expectedOutcome)) {
              expect(Object.keys(didResolutionMetadata)).toContain('error');
            }
          });
          if (didResolutionMetadata.hasOwnProperty('error')) {
            it('7.1.2 DID Resolution Metadata - The value of this property MUST be a single keyword ASCII string.', async () => {
              expect(didResolutionMetadata['error']).toBeAsciiString();
              expect(didResolutionMetadata['error']).not.toMatch('\\s');
            });
          }
          if (expectedOutcome === 'invalidDidErrorOutcome') {
            it('7.1.2 DID Resolution Metadata - invalidDid - The DID supplied to the DID resolution function does not conform to valid syntax.', async () => {
              expect(didResolutionMetadata['error']).toBe('invalidDid');
              expect(did).not.toBeValidDid();
              expect(didDocument).toBeFalsy();
            });
          }
          if (expectedOutcome === 'notFoundErrorOutcome') {
            it('7.1.2 DID Resolution Metadata - notFound - The DID resolver was unable to find the DID document resulting from this resolution request.', async() => {
              expect(didResolutionMetadata['error']).toBe('notFound');
              expect(didDocument).toBeFalsy();
            });
          }
          if (expectedOutcome === 'representationNotSupportedErrorOutcome') {
            it('7.1.2 DID Resolution Metadata - representationNotSupported - This error code is returned if the representation requested via the accept input metadata property is not supported by the DID method and/or DID resolver implementation.', async() => {
              expect(didResolutionMetadata['error']).toBe('representationNotSupported');
            });
          }
        });
      });
      describe('DID Document Metadata', () => {
        testDidDocumentMetadata(didDocumentMetadata, didDocument, expectedOutcome);
      });
    });
  });
};

const testDidDocumentMetadata = (didDocumentMetadata, didDocument, expectedOutcome) => {
  describe('created', () => {
    if (didDocumentMetadata.hasOwnProperty('created')) {
      it('7.1.3 DID Document Metadata - created - The value of the property MUST be a string formatted as an XML Datetime normalized to UTC 00:00:00 and without sub-second decimal precision.', async () => {
        expect(didDocumentMetadata['created']).toBeDidCoreDatetime();
        //console.log("CREATED CHECK", didDocumentMetadata['created'], 'SUCCESS');
      });
    }
  });
  describe('updated', () => {
    if (didDocumentMetadata.hasOwnProperty('updated')) {
      it('7.1.3 DID Document Metadata - updated - The value of the property MUST follow the same formatting rules as the created property.', async () => {
        expect(didDocumentMetadata['updated']).toBeDidCoreDatetime();
        //console.log("UPDATED CHECK", didDocumentMetadata['updated'], 'SUCCESS');
      });
      /*
       * While it is interesting to test this, it's not actually a normative statement in the specification, therefore this doesn't have to be tested.
       *
      if (didDocumentMetadata.hasOwnProperty('created')) {
        it('7.1.3 DID Document Metadata - updated - updated is later or equal than created.', async () => {
          expect((new Date(didDocumentMetadata['updated'])).getTime()).toBeGreaterThanOrEqual((new Date(didDocumentMetadata['created'])).getTime())
        });
      }
      */
    }
  });
  describe('deactivated', () => {
    if (expectedOutcome && (expectedOutcome === 'deactivatedOutcome')) {
      it('7.1.3 DID Document Metadata - deactivated - If a DID has been deactivated, DID document metadata MUST include this property with the boolean value true.', async () => {
        expect(Object.keys(didDocumentMetadata)).toContain('deactivated');
        expect(didDocumentMetadata['deactivated']).toBe(true);
      });
    }
    if (expectedOutcome && (expectedOutcome !== 'deactivatedOutcome')) {
      if (didDocumentMetadata.hasOwnProperty('deactivated')) {
        it('7.1.3 DID Document Metadata - deactivated - If a DID has not been deactivated, this property is OPTIONAL, but if included, MUST have the boolean value false.', async () => {
          expect(didDocumentMetadata['deactivated']).toBe(false);
        });
      }
    }
  });
  describe('nextUpdate', () => {
    if (didDocumentMetadata.hasOwnProperty('nextUpdate')) {
      it('7.1.3 DID Document Metadata - nextUpdate - The value of the property MUST follow the same formatting rules as the created property.', async () => {
        expect(didDocumentMetadata['nextUpdate']).toBeDidCoreDatetime();
      });
      /*
       * While it is interesting to test this, it's not actually a normative statement in the specification, therefore this doesn't have to be tested.
       *
      if (didDocumentMetadata.hasOwnProperty('created')) {
        it('7.1.3 DID Document Metadata - nextUpdate - nextUpdate is later than created.', async () => {
          expect((new Date(didDocumentMetadata['nextUpdate'])).getTime()).toBeGreaterThan((new Date(didDocumentMetadata['created'])).getTime())
        });
      }
      if (didDocumentMetadata.hasOwnProperty('updated')) {
        it('7.1.3 DID Document Metadata - nextUpdate - nextUpdate is later than updated.', async () => {
          expect((new Date(didDocumentMetadata['nextUpdate'])).getTime()).toBeGreaterThan((new Date(didDocumentMetadata['updated'])).getTime())
        });
      }
       */
    }
  });
  describe('versionId', () => {
    if (didDocumentMetadata.hasOwnProperty('versionId')) {
      it('7.1.3 DID Document Metadata - versionId - The value of the property MUST be an ASCII string.', async () => {
        expect(didDocumentMetadata['versionId']).toBeAsciiString();
        //console.log("VERSION_ID CHECK", didDocumentMetadata['versionId'], 'SUCCESS');
      });
    }
  });
  describe('nextVersionId', () => {
    if (didDocumentMetadata.hasOwnProperty('nextVersionId')) {
      it('7.1.3 DID Document Metadata - nextVersionId - The value of the property MUST be an ASCII string.', async () => {
        expect(didDocumentMetadata['nextVersionId']).toBeAsciiString();
      });
      /*
       * While it is interesting to test this, it's not actually a normative statement in the specification, therefore this doesn't have to be tested.
       *
      if (didDocumentMetadata.hasOwnProperty('versionId')) {
        it('7.1.3 DID Document Metadata - nextVersionId - nextVersionId is different from versionId.', async () => {
          expect(didDocumentMetadata['nextVersionId']).not.toBe(didDocumentMetadata['versionId']);
        });
      }
       */
    }
  });
  describe('equivalentId', () => {
    if (didDocumentMetadata.hasOwnProperty('equivalentId')) {
      it('7.1.3 DID Document Metadata - equivalentId - The value of equivalentId MUST be a set where each item in the list is a string that conforms to the rules in Section § 3.1 DID Syntax.', async () => {
        expect(Array.isArray(didDocumentMetadata['equivalentId'])).toBe(true);
        didDocumentMetadata['equivalentId'].forEach((equivalentId) => {
          expect(equivalentId).toBeValidDid();
        })
      });
      it('7.1.3 DID Document Metadata - equivalentId - Each equivalentId DID value MUST be produced by, and a form of, the same DID Method as the id property value.', async () => {
        if (didDocument) {
          didDocumentMetadata['equivalentId'].forEach((equivalentId) => {
            expect(utils.parseDidMethod(equivalentId)).toBe(utils.parseDidMethod(didDocument['id']));
          });
        }
      });
      // As discussed on the 2021-04-13 DID WG topic call, the following test can be skipped (see https://www.w3.org/2019/did-wg/Meetings/Minutes/2021-04-13-did-topic)
      // 'A conforming DID Method specification MUST guarantee that each equivalentId value is logically equivalent to the id property value.'
      // As discussed on the 2021-04-13 DID WG topic call, the following test can be skipped (see https://www.w3.org/2019/did-wg/Meetings/Minutes/2021-04-13-did-topic)
      // 'equivalentId is a much stronger form of equivalence than alsoKnownAs because the equivalence MUST be guaranteed by the governing DID method.'
    }
  });
  describe('canonicalId', () => {
    if (didDocumentMetadata.hasOwnProperty('canonicalId')) {
      it('7.1.3 DID Document Metadata - canonicalId - The value of canonicalId MUST be a string that conforms to the rules in Section § 3.1 DID Syntax.', async () => {
        const canonicalId = didDocumentMetadata['canonicalId'];
        expect(canonicalId).toBeValidDid();
      });
      it('7.1.3 DID Document Metadata - canonicalId - A canonicalId value MUST be produced by, and a form of, the same DID Method as the id property value.', async () => {
        if (didDocument) {
          const canonicalId = didDocumentMetadata['canonicalId'];
          expect(utils.parseDidMethod(canonicalId)).toBe(utils.parseDidMethod(didDocument['id']));
        }
      });
      // As discussed on the 2021-04-13 DID WG topic call, the following test can be skipped (see https://www.w3.org/2019/did-wg/Meetings/Minutes/2021-04-13-did-topic)
      // 'A conforming DID Method specification MUST guarantee that the canonicalId value is logically equivalent to the id property value.'
    }
  });
};

module.exports = { didResolutionTests, testDidDocumentMetadata };
