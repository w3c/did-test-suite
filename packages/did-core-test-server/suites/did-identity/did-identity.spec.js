let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default.js');
}

describe('6.x Production', () => {
  Object.keys(suiteConfig.didMethods).forEach((didMethod) => {
    describe(didMethod, () => {
      const didMethodSuiteConfig = suiteConfig.didMethods[didMethod];
      require('./did-syntax').didSyntaxTests(didMethodSuiteConfig);
      require('./did-parameters').didParametersTests(didMethodSuiteConfig);
    });
  });
});
