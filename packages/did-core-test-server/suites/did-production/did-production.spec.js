let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

runtimeSuiteConfig.didMethods.forEach((didMethodSuiteConfig) => {
  const {didMethod, implementation, implementer} = didMethodSuiteConfig;
  let suiteName =
    `6.x Production - ${didMethod} - ${implementation} - ${implementer}`;

  describe(suiteName, () => {
    require('./did-producer').didProducerTests(
      didMethodSuiteConfig
    );
    require('./did-json-production').didJsonProductionTests(
      didMethodSuiteConfig
    );
    require('./did-jsonld-production').didJsonldProductionTests(
      didMethodSuiteConfig
    );
  });
});
