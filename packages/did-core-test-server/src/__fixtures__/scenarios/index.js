const resolve = require('./resolve');
const unknown_scenario = require('./unknown-scenario');
const all = require('./all');

module.exports = {
  resolve,
  unknown_scenario,
  all,
  ['did-parameters']: require('./did-parameters'),
  ['json-production']: require('./json-production'),
  ['equivalence-properties']: require('./equivalence-properties'),
};
