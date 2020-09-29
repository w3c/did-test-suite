module.exports = {
  resolve: require('./resolve'),
  ['did-syntax']: require('./did-syntax'),
  ['did-parameters-negative-tests']: require('./did-parameters/did-parameters-negative-tests'),
  ['did-parameters-positive-tests']: require('./did-parameters/did-parameters-positive-tests'),
  ['json-production-positive-tests']: require('./json-production/json-production-positive-tests'),
};
