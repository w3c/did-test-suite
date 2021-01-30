const runSuite = (suiteConfig) => {
  Object.keys(suiteConfig.vendors).forEach((vendor) => {
    describe(vendor, () => {
      const vendorSupportedMethod = suiteConfig.vendors[vendor].didMethods;
      Object.keys(vendorSupportedMethod).forEach((didMethod) => {
        describe(didMethod, () => {
          const didMethodSuiteConfig = vendorSupportedMethod[didMethod];
          require('./did-syntax').didSyntaxTests(didMethodSuiteConfig);
          require('./did-parameters').didParametersTests(didMethodSuiteConfig);
          require('./did-resolution').didResolutionTests(didMethodSuiteConfig);
          require('./did-json-production').didJsonProductionTests(
            didMethodSuiteConfig
          );
          require('./did-ld-json-production').didLdJsonProductionTests(
            didMethodSuiteConfig
          );
        });
      });
    });
  });
};

module.exports = { runSuite };
