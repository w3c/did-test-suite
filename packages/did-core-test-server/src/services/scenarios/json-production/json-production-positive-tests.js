const { generateScenarioResults } = require('../../utils');

const assertions = {
  'Numeric values representable as IEEE754 MUST be represented as a Number type.': (
    scenario
  ) => {
    return false;
  },
  'Boolean values MUST be represented as a Boolean literal.': (scenario) => {
    return false;
  },
  'Sequence value MUST be represented as an Array type.': (scenario) => {
    return false;
  },
  'Unordered sets of values MUST be represented as an Array type.': (
    scenario
  ) => {
    return false;
  },
  'Sets of properties MUST be represented as an Object type.': (scenario) => {
    return false;
  },
  'Empty values MUST be represented as a null literal.': (scenario) => {
    return false;
  },
};
module.exports = generateScenarioResults(assertions);
