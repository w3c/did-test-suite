module.exports = {
  resolve: require('./resolve'),
  ['did-parameters-negative-tests']: require('./did-parameters/did-parameters-negative-tests'),
  ['did-parameters-positive-tests']: require('./did-parameters/did-parameters-positive-tests'),
  ['json-production-positive-tests']: require('./json-production/json-production-positive-tests'),
  ['equivalence-properties-both-positive']: require('./equivalence-properties/equivalence-properties-both-positive-tests'),
};
