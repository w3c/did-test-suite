let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default');
}

suiteConfig.didMethods.forEach((didMethodSuiteConfig) => {
  const {didMethod, implementation, implementer} = didMethodSuiteConfig;
  let suiteName =
    `6.x Consumption - ${didMethod} - ${implementation} - ${implementer}`;

  describe(suiteName, () => {
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
