let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

describe("suites/did-production", () => {
  runtimeSuiteConfig.didMethods.forEach((didMethodSuiteConfig) => {
    const {didMethod, implementation, implementer} = didMethodSuiteConfig;

    describe(`IMPLEMENTATION ::${didMethod}::${implementation}::${implementer}::`, () => {
      let suiteName =
      `6.x Production - ${didMethod} - ${implementation} - ${implementer}`;

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
});
