let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

runtimeSuiteConfig.didMethods.forEach((didMethodSuiteConfig) => {
  const {didMethod, implementation, implementer} = didMethodSuiteConfig;
  let suiteName =
    `6.x Consumption - ${didMethod} - ${implementation} - ${implementer}`;

  describe(suiteName, () => {
    describe(`IMPLEMENTATION ::${didMethod}::${implementation}::${implementer}::`, () => {
        require('./did-consumer').didConsumerTests(
        didMethodSuiteConfig
      );
      require('./did-json-consumption').didJsonConsumptionTests(
        didMethodSuiteConfig
      );
      require('./did-jsonld-consumption').didJsonldConsumptionTests(
        didMethodSuiteConfig
      );
    });
  });
});
