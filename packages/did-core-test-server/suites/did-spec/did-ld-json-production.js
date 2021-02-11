const didLdJsonProductionTests = (suiteConfig) => {
  if (suiteConfig.supportedContentTypes.includes('application/did+ld+json')) {
    describe.skip('did-ld-json-production', () => {});
  }
};

module.exports = { didLdJsonProductionTests };
