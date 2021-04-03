let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default.js');
}

suiteConfig.didMethods.forEach((didMethodSuiteConfig) => {
  const {didMethod, implementation, implementer} = didMethodSuiteConfig;
  const suiteName =
    `3.x Identifier - ${didMethod} - ${implementation} - ${implementer}`;
  describe(suiteName, () => {
    require('./did-syntax').didSyntaxTests(didMethodSuiteConfig);
    require('./did-parameters').didParametersTests(didMethodSuiteConfig);
  });
});
