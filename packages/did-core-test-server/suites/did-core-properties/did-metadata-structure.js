const didMetadataStructureTest_r = (didDocumentMetadata) => {
    it('The structure used to communicate this metadata MUST be a map of properties.', () => {
        expect(didDocumentMetadata instanceof Object).toBeTruthy();
    });

    it('Each property name MUST be a string.', () => {
        Object.keys(didDocumentMetadata).forEach((property_name) => {
            expect(typeof property_name).toBe("string");
        });
    });

    it('Each property value MUST be a string, map, list, ordered set, boolean, or null.', () => {
        Object.keys(didDocumentMetadata).forEach((property_name) => {
            expect(typeof didDocumentMetadata[property_name]).toEqual(expect.stringMatching(/(string|object|boolean)/));  // map, list, set and null are objects
        });
    });

    it('The values within any complex data structures such as maps and lists ' +
        'MUST be one of these data types as well.', () => {
            Object.keys(didDocumentMetadata).forEach((property_name) => {
                if (typeof didDocumentMetadata[property_name] == "object") {
                    didMetadataStructureTest_r(didDocumentMetadata[property_name]);
                }
            });
        });

    it.todo('All metadata property definitions registered in the DID Specification Registries ' +
        '[DID-SPEC-REGISTRIES] MUST define the value type, including any additional formats ' +
        'or restrictions to that value (for example, a string formatted as a date or as a decimal integer).');

    it('The entire metadata structure MUST be serializable according to the JSON ' +
        'serialization rules in the [INFRA] specification.', () => {
            // Checking this by serialize/deserialize to/from JSON, then compare the result
            var obj = {};
            expect(() => {
                obj = JSON.parse(JSON.stringify(didDocumentMetadata));
            }).not.toThrow();
            expect(didDocumentMetadata).toEqual(obj);
    });
};

const didMetadataStructureTests = (suiteConfig) => {
    suiteConfig.dids.forEach((didExample) => {
        describe(didExample, () => {
            suiteConfig.supportedContentTypes.forEach((contentType) => {
                describe(contentType, () => {
                    const didDocumentMetadata = suiteConfig[didExample][contentType].didDocumentMetadata;
                    if (didDocumentMetadata) {
                        didMetadataStructureTest_r(didDocumentMetadata);
                    };
                });
            })
        });
    })
};

module.exports = { didMetadataStructureTests };
