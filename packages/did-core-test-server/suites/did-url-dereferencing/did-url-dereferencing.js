const isErrorExpectedOutcome = require('./utils').isErrorExpectedOutcome;
const parseDidMethod = require('./utils').parseDidMethod;
const expectAsciiString = require('./utils').expectAsciiString;
const expectXmlDateTimeNormalizedToUtcWithoutPrecision = require('./utils').expectXmlDateTimeNormalizedToUtcWithoutPrecision;
const expectMediaType = require('./utils').expectMediaType;
const expectConformantDidUrl = require('./utils').expectConformantDidUrl;
const expectConformantDidDocument = require('./utils').expectConformantDidDocument;
const expectConformantMetadataStructure = require('./utils').expectConformantMetadataStructure;
const expectKnownConformantMediaType = require('./utils').expectKnownConformantMediaType;
const expectConformantRepresentation = require('./utils').expectConformantRepresentation;

const didUrlDereferencingTests = (execution, expectedOutcome) => {
  const { didUrl, dereferenceOptions } = execution.input;
  const { dereferencingMetadata, contentStream, contentMetadata } = execution.output;
  describe('DID URL Dereferencing', () => {
    describe(didUrl + ' (expected outcome: ' + expectedOutcome + ')', () => {
      describe('didUrl', () => {
        it('A conformant DID URL as a single string.', async() => {
          if (! dereferencingMetadata.hasOwnProperty('error') || dereferencingMetadata['error'] !== 'invalidDidUrl') {
            expectConformantDidUrl(didUrl);
          }
        });
        it('To dereference a DID fragment, the complete DID URL including the DID fragment MUST be used.', async () => {
          // TODO: Not sure yet how to test this.
        });
        it('This input is REQUIRED.', async () => {
          expect(didUrl).not.toBeFalsy();
        });
      });
      describe('dereferenceOptions', () => {
        it('A metadata structure.', async () => {
          expectConformantMetadataStructure(dereferenceOptions);
        });
        it('This input is REQUIRED, but the structure MAY be empty.', async () => {
          expect(dereferenceOptions).not.toBeFalsy();
        });
      });
      describe('dereferencingMetadata', () => {
        it('A metadata structure.', async () => {
          expectConformantMetadataStructure(dereferencingMetadata);
        });
        it('This structure is REQUIRED, and in the case of an error in the dereferencing process, this MUST NOT be empty.', async () => {
          expect(dereferencingMetadata).not.toBeFalsy();
          if (isErrorExpectedOutcome(expectedOutcome)) {
            expect(Object.keys(dereferencingMetadata)).not.toHaveLength(0);
          }
        });
        it('If the dereferencing is not successful, this structure MUST contain an error property describing the error.', async () => {
          if (isErrorExpectedOutcome(expectedOutcome)) {
            expect(Object.keys(dereferencingMetadata)).toContain('error');
            expect(dereferencingMetadata['error']).toBeTruthy();
          }
        });
      });
      // Only test 'contentStream' if 'dereference' was called.
      if (execution.function === 'dereference') {
        describe('contentStream', () => {
          it('If the dereferencing function was called and successful, this MUST contain a resource corresponding to the DID URL.', async () => {
            if (! dereferencingMetadata.hasOwnProperty('error')) {
              expect(contentStream).not.toBeFalsy();
            }
          });
          it('If the dereferencing is unsuccessful, this value MUST be empty.', async () => {
            if (dereferencingMetadata.hasOwnProperty('error')) {
              expect(contentStream).toBe('');
            }
          });
        });
      }
      describe('contentMetadata', () => {
        it('If the dereferencing is successful, this MUST be a metadata structure, but the structure MAY be empty.', async () => {
          if (! dereferencingMetadata.hasOwnProperty('error')) {
            expectConformantMetadataStructure(contentMetadata);
          }
        });
        it('If the contentStream is a DID document, this MUST be a didDocumentMetadata structure as described in DID Resolution.', async () => {
          // TODO
        });
        it('If the dereferencing is unsuccessful, this output MUST be an empty metadata structure.', async () => {
          if (dereferencingMetadata.hasOwnProperty('error')) {
            expectConformantMetadataStructure(contentMetadata);
            expect(Object.keys(contentMetadata)).toHaveLength(0);
          }
        });
      });
      describe('DID URL Dereferencing Options', () => {
        describe('accept', () => {
          if (dereferenceOptions.hasOwnProperty('accept')) {
            it('The Media Type that the caller prefers for contentStream.', async () => {
                expectMediaType(dereferenceOptions['accept']);
            });
            it('The Media Type MUST be expressed as an ASCII string.', async () => {
                expectAsciiString(dereferenceOptions['accept']);
            });
          }
        });
      });
      describe('DID URL Dereferencing Metadata', () => {
        describe('contentType', () => {
          if (dereferencingMetadata.hasOwnProperty('contentType')) {
            it('The Media Type value MUST be expressed as an ASCII string.', async () => {
              expectMediaType(dereferencingMetadata['contentType']);
              expectAsciiString(dereferencingMetadata['contentType']);
            });
          }
        });
        describe('error', () => {
          it('This property is REQUIRED when there is an error in the dereferencing process.', async () => {
            if (isErrorExpectedOutcome(expectedOutcome)) {
              expect(Object.keys(dereferencingMetadata)).toContain('error');
            }
          });
          if (dereferencingMetadata.hasOwnProperty('error')) {
            it('The value of this property MUST be a single keyword ASCII string.', async () => {
              expectAsciiString(dereferencingMetadata['error']);
              expect(dereferencingMetadata['error']).not.toMatch('\\s');
            });
          }
          if (expectedOutcome === 'invalidDidErrorUrlOutcome') {
            it('invalidDidUrl - The DID URL supplied to the DID URL dereferencing function does not conform to valid syntax.', async () => {
              expect(dereferencingMetadata['error']).toBe('invalidDidUrl');
              // TODO: Check if the input didUrl is really invalid.
            });
          }
          if (expectedOutcome === 'notFoundErrorOutcome') {
            it('notFound - The DID URL dereferencer was unable to find the contentStream resulting from this dereferencing request.', async() => {
              expect(dereferencingMetadata['error']).toBe('notFound');
            });
          }
        });
      });
    });
  });
};

module.exports = { didUrlDereferencingTests };
