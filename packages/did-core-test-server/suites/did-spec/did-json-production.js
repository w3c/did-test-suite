const didJsonProductionTests = (suiteConfig) => {
  if (suiteConfig.supportedContentTypes.includes('application/did+json')) {
    describe.skip('did-json-production', () => {});
  }
};

module.exports = { didJsonProductionTests };
