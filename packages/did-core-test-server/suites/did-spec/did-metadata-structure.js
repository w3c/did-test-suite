const didMetadataStructureTests = (suiteConfig) => {
    describe('7.3 Metadata Structure', () => {
        suiteConfig.dids.forEach((didExample) => {
            describe(didExample, () => {
                suiteConfig.supportedContentTypes.forEach((contentType) => {
                    describe(contentType, () => {
                        const didDocumentMetadata = suiteConfig[didExample][contentType].didDocumentMetadata;
                        if (didDocumentMetadata) {
                            describe("didDocumentMetadata", () => {
                                it('The structure used to communicate this metadata MUST be a map of properties.', () => {
                                    expect(didDocumentMetadata instanceof Object).toBeTruthy();
                                });

                                it.todo('Each property name MUST be a string.');

                                it.todo('Each property value MUST be a string, map, list, ordered set, boolean, or null.');

                                it.todo('The values within any complex data structures such as maps and lists ' +
                                    'MUST be one of these data types as well.');

                                it.todo('All metadata property definitions registered in the DID Specification Registries ' +
                                    '[DID-SPEC-REGISTRIES] MUST define the value type, including any additional formats ' +
                                    'or restrictions to that value (for example, a string formatted as a date or as a decimal integer).');

                                it.todo('The entire metadata structure MUST be serializable according to the JSON ' +
                                    'serialization rules in the [INFRA] specification.');
                            });
                        };
                    });
                })
            });
        })
    });
};

module.exports = { didMetadataStructureTests };