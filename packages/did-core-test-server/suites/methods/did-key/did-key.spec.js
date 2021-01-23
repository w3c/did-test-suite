let { suiteConfig } = global;

if (!suiteConfig) {
  // did-key only for testing purposes
  suiteConfig = require('./defaultSuiteConfig.json');
}

describe('did-spec', () => {
  Object.keys(suiteConfig.didMethods).forEach((didMethod) => {
    describe(didMethod, () => {
      const didMethodSuiteConfig = suiteConfig.didMethods[didMethod];
      require('../../did-spec/did-syntax').didSyntaxTests(didMethodSuiteConfig);
      require('../../did-spec/did-parameters').didParametersTests(
        didMethodSuiteConfig
      );
      require('../../did-spec/did-resolution').didResolutionTests(
        didMethodSuiteConfig
      );
      require('../../did-spec/did-json-production').didJsonProductionTests(
        didMethodSuiteConfig
      );
      require('../../did-spec/did-ld-json-production').didLdJsonProductionTests(
        didMethodSuiteConfig
      );
    });
  });
});
