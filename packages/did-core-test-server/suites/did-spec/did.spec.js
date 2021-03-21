let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./defaultSuiteConfig.json');
}

describe('did-spec', () => {
  Object.keys(suiteConfig.didMethods).forEach((didMethod) => {
    describe(didMethod, () => {
      const didMethodSuiteConfig = suiteConfig.didMethods[didMethod];
      require('./did-syntax').didSyntaxTests(didMethodSuiteConfig);
      require('./did-parameters').didParametersTests(didMethodSuiteConfig);
      require('./did-core-properties').didCorePropertiesTests(
        didMethodSuiteConfig);
      require('./did-json-production').didJsonProductionTests(
        didMethodSuiteConfig
      );
      require('./did-jsonld-production').didJsonldProductionTests(
        didMethodSuiteConfig
      );
      require('./did-resolution').didResolutionTests(didMethodSuiteConfig);
    });
  });
});
