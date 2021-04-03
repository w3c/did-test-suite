let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default.js');
}

describe('6.x Production', () => {
  Object.keys(suiteConfig.didMethods).forEach((didMethod) => {
    describe(didMethod, () => {
      const didMethodSuiteConfig = suiteConfig.didMethods[didMethod];
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
