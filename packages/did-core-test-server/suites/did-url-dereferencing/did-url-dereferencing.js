const utils = require('../resolution-utils');
const resolution = require('../did-resolution/did-resolution.js');

const didUrlDereferencingTests = (execution, expectedOutcome, imp) => {
  const { didUrl, dereferenceOptions } = execution.input;
  const { dereferencingMetadata, contentStream, contentMetadata } = execution.output;
  describe(didUrl, () => {
    describe('PARAMETER expected outcome: ' + expectedOutcome, () => {
      describe('didUrl', () => {
        it('3.1 DID Syntax - All DID URLs MUST conform to the DID URL Syntax ' +
          'ABNF Rules.', async () => {
          if(! dereferencingMetadata.hasOwnProperty('error') || dereferencingMetadata['error'] !== 'invalidDidUrl') {
            expect(didUrl).toBeValidDidUrl();
          }
        });
  
        it.todo('3.2.2 Relative DID URLs - When resolving a relative DID URL reference, the algorithm specified in RFC3986 Section 5: Reference Resolution MUST be used.');
        it('7.2 DID URL Dereferencing - A conformant DID URL as a single string.', async() => {
          if (! dereferencingMetadata.hasOwnProperty('error') || dereferencingMetadata['error'] !== 'invalidDidUrl') {
            expect(didUrl).toBeValidDidUrl();
          }
        });
        it('7.2 DID URL Dereferencing - To dereference a DID fragment, the complete DID URL including the DID fragment MUST be used.', async () => {
          if(didUrl.includes('#')) {
            const didUrlWithoutFragment = didUrl.substring(0, didUrl.indexOf('#'));
            const executionWithoutFragment = utils.findExecutionByDidUrl(imp, didUrlWithoutFragment);
            expect(executionWithoutFragment).toBeDefined();
            const contentStreamWithoutFragment = executionWithoutFragment.output.contentStream;
            expect(contentStreamWithoutFragment).not.toBe(contentStream);
          }
        });
        it('7.2 DID URL Dereferencing - This input is REQUIRED.', async () => {
          expect(didUrl).not.toBeFalsy();
        });
      });
      describe('dereferencingOptions', () => {
        it('7.2 DID URL Dereferencing - A metadata structure.', async () => {
          utils.expectConformantMetadataStructure(dereferenceOptions);
        });
        it('7.2 DID URL Dereferencing - This input is REQUIRED, but the structure MAY be empty.', async () => {
          expect(dereferenceOptions).not.toBeFalsy();
        });
      });
      describe('dereferencingMetadata', () => {
        it('7.2 DID URL Dereferencing - A metadata structure.', async () => {
          utils.expectConformantMetadataStructure(dereferencingMetadata);
        });
        it('7.2 DID URL Dereferencing - This structure is REQUIRED, and in the case of an error in the dereferencing process, this MUST NOT be empty.', async () => {
          expect(dereferencingMetadata).not.toBeFalsy();
          if (utils.isErrorExpectedOutcome(expectedOutcome)) {
            expect(Object.keys(dereferencingMetadata)).not.toHaveLength(0);
          }
        });
        it('7.2 DID URL Dereferencing - If the dereferencing is not successful, this structure MUST contain an error property describing the error.', async () => {
          if (utils.isErrorExpectedOutcome(expectedOutcome)) {
            expect(Object.keys(dereferencingMetadata)).toContain('error');
            expect(dereferencingMetadata['error']).toBeTruthy();
          }
        });
      });
      // Only test 'contentStream' if 'dereference' was called.
      if (execution.function === 'dereference') {
        describe('contentStream', () => {
          it('7.2 DID URL Dereferencing - If the dereferencing function was called and successful, this MUST contain a resource corresponding to the DID URL.', async () => {
            if (! dereferencingMetadata.hasOwnProperty('error')) {
              expect(contentStream).not.toBeFalsy();
            }
          });
          it('7.2 DID URL Dereferencing - If the dereferencing is unsuccessful, this value MUST be empty.', async () => {
            if (dereferencingMetadata.hasOwnProperty('error')) {
              expect(contentStream).toBe('');
            }
          });
        });
      }
      describe('contentMetadata', () => {
        it('7.2 DID URL Dereferencing - If the dereferencing is successful, this MUST be a metadata structure, but the structure MAY be empty.', async () => {
          if (! dereferencingMetadata.hasOwnProperty('error')) {
            utils.expectConformantMetadataStructure(contentMetadata);
          }
        });
        describe('If the contentStream is a DID document, this MUST be a didDocumentMetadata structure as described in DID Resolution.', () => {
          if (! dereferencingMetadata.hasOwnProperty('error')) {
            const didDocument = utils.consumeRepresentation(contentStream, dereferencingMetadata['contentType']);
            if (didDocument) {
              utils.expectConformantMetadataStructure(contentMetadata);
              resolution.testDidDocumentMetadata(contentMetadata, didDocument, execution);
            }
          }
        });
        it('7.2 DID URL Dereferencing - If the dereferencing is unsuccessful, this output MUST be an empty metadata structure.', async () => {
          if (dereferencingMetadata.hasOwnProperty('error')) {
            utils.expectConformantMetadataStructure(contentMetadata);
            expect(Object.keys(contentMetadata)).toHaveLength(0);
          }
        });
      });
      describe('DID URL Dereferencing Options', () => {
        describe('accept', () => {
          if (dereferenceOptions.hasOwnProperty('accept')) {
            it('7.2.1 DID URL Dereferencing Options - The Media Type that the caller prefers for contentStream.', async () => {
                expect(dereferenceOptions['accept']).toBeMediaType();
            });
            it('7.2.1 DID URL Dereferencing Options - The Media Type MUST be expressed as an ASCII string.', async () => {
                expect(dereferenceOptions['accept']).toBeAsciiString();
            });
          }
        });
      });
      describe('DID URL Dereferencing Metadata', () => {
        describe('contentType', () => {
          if (dereferencingMetadata.hasOwnProperty('contentType')) {
            it('7.2.2 DID URL Dereferencing Metadata - The Media Type value MUST be expressed as an ASCII string.', async () => {
              expect(dereferencingMetadata['contentType']).toBeMediaType();
              expect(dereferencingMetadata['contentType']).toBeAsciiString();
            });
          }
        });
        describe('error', () => {
          it('7.2.2 DID URL Dereferencing Metadata - This property is REQUIRED when there is an error in the dereferencing process.', async () => {
            if (utils.isErrorExpectedOutcome(expectedOutcome)) {
              expect(Object.keys(dereferencingMetadata)).toContain('error');
            }
          });
          if (dereferencingMetadata.hasOwnProperty('error')) {
            it('7.2.2 DID URL Dereferencing Metadata - The value of this property MUST be a single keyword ASCII string.', async () => {
              expect(dereferencingMetadata['error']).toBeAsciiString();
              expect(dereferencingMetadata['error']).not.toMatch('\\s');
            });
          }
          if (expectedOutcome === 'invalidDidUrlErrorOutcome') {
            it('7.2.2 DID URL Dereferencing Metadata - invalidDidUrl - The DID URL supplied to the DID URL dereferencing function does not conform to valid syntax.', async () => {
              expect(dereferencingMetadata['error']).toBe('invalidDidUrl');
              expect(didUrl).not.toBeValidDidUrl();
            });
          }
          if (expectedOutcome === 'notFoundErrorOutcome') {
            it('7.2.2 DID URL Dereferencing Metadata - notFound - The DID URL dereferencer was unable to find the contentStream resulting from this dereferencing request.', async() => {
              expect(dereferencingMetadata['error']).toBe('notFound');
            });
          }
        });
      });
    });
  });
};

module.exports = { didUrlDereferencingTests };
