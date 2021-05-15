let { systemSuiteConfig } = global;
if (!systemSuiteConfig) { // when run via command line
  systemSuiteConfig = {};
}
defaultSuiteConfig = require('./default');
runtimeSuiteConfig = Object.assign({}, defaultSuiteConfig, systemSuiteConfig);

runtimeSuiteConfig.didMethods.forEach((didMethodSuiteConfig) => {
  const {didMethod, implementation, implementer} = didMethodSuiteConfig;
  let suiteName =
    `5.x Core Properties - ${didMethod} - ${implementation} - ${implementer}`;
  describe(suiteName, () => {
    require('./did-core-properties').didCorePropertiesTests(
      didMethodSuiteConfig);
  });

  suiteName = `7.3 Metadata Structure - ` +
    `${didMethod} - ${implementation} - ${implementer}`;
  describe(suiteName, () => {
    require('./did-metadata-structure').didMetadataStructureTests(
        didMethodSuiteConfig);
  });
});
