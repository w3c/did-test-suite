const utils = require('./utils');

const didResolutionTests = (suiteConfig) => {
  describe('resolution', () => {
    suiteConfig.dids.forEach((didExample) => {
      describe(didExample, () => {
        suiteConfig.supportedContentTypes.forEach((contentType) => {
          describe(contentType, () => {
            describe('id', () => {
              it('MUST be the same as the resolved ID', async () => {
                expect(
                  suiteConfig[didExample][contentType].didDocument.id
                ).toBe(didExample);
              });
            });

            if (
              suiteConfig[didExample][contentType].didDocumentMetadata['canonicalId']
            ) {
              describe('canonicalId', () => {
                it('MUST be of the same DID Method as the resolved ID', async () => {
                  const canonicalIdMethod = suiteConfig[didExample][
                    contentType
                  ].didDocumentMetadata['canonicalId'].split(':')[1];
                  const resolvedIdMethod = didExample.split(':')[1];
                  expect(canonicalIdMethod).toBe(resolvedIdMethod);
                });

                it('MUST be recognized as the primary ID reference', async () => {
                  return false;
                });

                if (
                  suiteConfig[didExample][contentType].didDocumentMetadata
                    .canonicalId !==
                  suiteConfig[didExample][contentType].didDocumentMetadata.id
                ) {
                  it('If the resolved ID differs from canonicalId, it must be recognized as an equivalent reference', async () => {
                    expect(
                      suiteConfig[didExample][contentType].didDocumentMetadata
                        .equivalentId
                    ).toBe(
                      suiteConfig[didExample][contentType].didDocumentMetadata
                        .canonicalId
                    );
                  });
                }
              });
            }

            if (
              suiteConfig[didExample][contentType].didDocumentMetadata['equivalentId']
            ) {
              describe('equivalentId', () => {
                it('MUST be of the same DID Method as the resolved ID', async () => {
                  const { didDocumentMetadata } = suiteConfig[didExample][contentType];
                  const equivalentIdMethod = didDocumentMetadata.equivalentId.split(
                    ':'
                  )[1];
                  const resolvedIdMethod = didExample.split(':')[1];
                  expect(equivalentIdMethod).toBe(resolvedIdMethod);
                });

                it('Its values must be recognized as equivalent ID references.', async () => {
                  const { didDocumentMetadata } = suiteConfig[didExample][contentType];
                  const equivalentId = didDocumentMetadata.equivalentId;
                  expect(equivalentId).toBeDefined();
                });

                it('Resolved ID must be recognized as the primary reference, absent a specified canonicalId', async () => {
                  const { didDocumentMetadata } = suiteConfig[didExample][contentType];
                  const primaryId = !didDocumentMetadata.canonicalId
                    ? didDocumentMetadata.id
                    : didDocumentMetadata.equivalentId;
                  expect(primaryId).toBeDefined();
                });
              });
            }

            if (suiteConfig[didExample][contentType].didDocumentMetadata['created']) {
              describe('created', () => {
                it('Must be an XML Datetime', async () => {
                  const {
                    didDocumentMetadata: { created }
                  } = suiteConfig[didExample][contentType];
                  expect(utils.isXmlDatetime(created)).toBe(true)
                })
              })
            }

            if (suiteConfig[didExample][contentType].didDocumentMetadata['updated']) {
              describe('updated', () => {
                it('Must be an XML Datetime', async () => {
                  const {
                    didDocumentMetadata: { updated }
                  } = suiteConfig[didExample][contentType];
                  expect(utils.isXmlDatetime(updated)).toBe(true)
                })

                it('Must be larger than or equal to "created"', async () => {
                  const {
                    didDocumentMetadata: { created, updated }
                  } = suiteConfig[didExample][contentType];
                  expect((new Date(updated)).getTime()).toBeGreaterThanOrEqual((new Date(created)).getTime())
                })
              })
            }

            if (suiteConfig[didExample][contentType].didDocumentMetadata['nextUpdate']) {
              describe('nextUpdate', () => {
                it('Must be an XML Datetime', async () => {
                  const {
                    didDocumentMetadata: { nextUpdate }
                  } = suiteConfig[didExample][contentType];
                  expect(utils.isXmlDatetime(nextUpdate)).toBe(true)
                })

                it('Must be larger than to "updated"', async () => {
                  const {
                    didDocumentMetadata: { updated, nextUpdate }
                  } = suiteConfig[didExample][contentType];
                  expect((new Date(nextUpdate)).getTime()).toBeGreaterThan((new Date(updated)).getTime())
                })
              })
            }

            if (suiteConfig[didExample][contentType].didDocumentMetadata['versionId']) {
              describe('versionId', () => {
                it('Must be an ASCII string', async () => {
                  const {
                    didDocumentMetadata: { versionId }
                  } = suiteConfig[didExample][contentType];
                  expect(utils.isAsciiString(versionId)).toBe(true);
                })
              })
            }

            if (suiteConfig[didExample][contentType].didDocumentMetadata['nextVersionId']) {
              describe('nextVersionId', () => {
                it('Must be an ASCII string', async () => {
                  const {
                    didDocumentMetadata: { nextVersionId }
                  } = suiteConfig[didExample][contentType];
                  expect(utils.isAsciiString(nextVersionId)).toBe(true);
                })

                it('Must not be equal to versionId', async () => {
                  const {
                    didDocumentMetadata: { versionId, nextVersionId }
                  } = suiteConfig[didExample][contentType];
                  expect(nextVersionId).not.toEqual(versionId)
                })
              })
            }
          });
        });
      });
    });
  });
};

module.exports = { didResolutionTests };
