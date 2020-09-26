const { generateScenarioResults } = require('../utils');

const assertions = {
  'did should match did-document id': (scenario) => {
    return scenario.input.did === scenario.output['did-document'].id;
  },
};

module.exports = generateScenarioResults(assertions);
