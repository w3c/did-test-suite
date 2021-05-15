let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

runtimeSuiteConfig.didMethods.forEach((didMethodSuiteConfig) => {
  const {didMethod, implementation, implementer} = didMethodSuiteConfig;
  const suiteName =
    `3.x Identifier - ${didMethod} - ${implementation} - ${implementer}`;
  describe(suiteName, () => {
    require('./did-syntax').didSyntaxTests(didMethodSuiteConfig);
    require('./did-parameters').didParametersTests(didMethodSuiteConfig);
  });
});
