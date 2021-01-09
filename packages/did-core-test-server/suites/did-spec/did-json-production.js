const didJsonProductionTests = (suiteConfig) => {
  if (suiteConfig.supportedContentTypes.includes('application/did+json')) {
    describe('did-json-production', () => {
      it.todo(
        'Numeric values representable as IEEE754 MUST be represented as a Number type.'
      );
      it.todo('Boolean values MUST be represented as a Boolean literal.');
      it.todo('Sequence value MUST be represented as an Array type.');
      it.todo('Unordered sets of values MUST be represented as an Array type.');
      it.todo('Sets of properties MUST be represented as an Object type.');
      it.todo('Empty values MUST be represented as a null literal.');
    });
  }
};

module.exports = { didJsonProductionTests };
