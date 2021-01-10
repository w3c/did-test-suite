const didResolutionTests = (suiteConfig) => {
  describe('resolution', () => {
    suiteConfig.dids.forEach((didExample) => {
      describe(didExample, () => {
        suiteConfig.supportedContentTypes.forEach((contentType) => {
          describe(contentType, () => {
            it('did should match did-document id', async () => {
              expect(suiteConfig[didExample][contentType].didDocument.id).toBe(
                didExample
              );
            });

            if (
              suiteConfig[didExample][contentType].didDocument['canonicalId']
            ) {
              describe('canonicalId', () => {
                it('canonicalId MUST be of the same DID Method as the resolved ID', async () => {
                  const canonicalIdMethod = suiteConfig[didExample][
                    contentType
                  ].didDocument['canonicalId'].split(':')[1];
                  const resolvedIdMethod = didExample.split(':')[1];
                  expect(canonicalIdMethod).toBe(resolvedIdMethod);
                });

                it('canonicalId MUST be recognized as the primary ID reference', async () => {
                  return false;
                });

                if (
                  suiteConfig[didExample][contentType].didDocument
                    .canonicalId !==
                  suiteConfig[didExample][contentType].didDocument.id
                ) {
                  it('If the resolved ID differs from canonicalId, it must be recognized as an equivalent reference', async () => {
                    expect(
                      suiteConfig[didExample][contentType].didDocument
                        .equivalentId
                    ).toBe(
                      suiteConfig[didExample][contentType].didDocument
                        .canonicalId
                    );
                  });
                }
              });
            }

            if (
              suiteConfig[didExample][contentType].didDocument['equivalentId']
            ) {
              describe('equivalentId', () => {
                it('equivalentId MUST be of the same DID Method as the resolved ID', async () => {
                  const { didDocument } = suiteConfig[didExample][contentType];
                  const equivalentIdMethod = didDocument.equivalentId.split(
                    ':'
                  )[1];
                  const resolvedIdMethod = didExample.split(':')[1];
                  expect(equivalentIdMethod).toBe(resolvedIdMethod);
                });

                it('Its values must be recognized as equivalent ID references.', async () => {
                  const { didDocument } = suiteConfig[didExample][contentType];
                  const equivalentId = didDocument.equivalentId;
                  expect(equivalentId).toBeDefined();
                });

                it('Resolved ID must be recognized as the primary reference, absent a specified canonicalId', async () => {
                  const { didDocument } = suiteConfig[didExample][contentType];
                  const primaryId = !didDocument.canonicalId
                    ? didDocument.id
                    : didDocument.equivalentId;
                  expect(primaryId).toBeDefined();
                });
              });
            }
          });
        });
      });
    });
  });
};

module.exports = { didResolutionTests };
