let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default.js');
}

describe('did-spec', () => {
  Object.keys(suiteConfig.didMethods).forEach((didMethod) => {
    describe(didMethod, () => {
      const didMethodSuiteConfig = suiteConfig.didMethods[didMethod];
      require('./did-core-properties').didCorePropertiesTests(
        didMethodSuiteConfig);
      require('./did-metadata-structure').didMetadataStructureTests(
          didMethodSuiteConfig);
    });
  });
});
