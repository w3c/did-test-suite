const scenarios = require('./scenarios');

const test_scenario = (scenario) => {
  // console.log(scenario);
  if (scenarios[scenario.name]) {
    return scenarios[scenario.name](scenario);
  } else {
    throw new Error('No test for scenario');
  }
};

module.exports = { test_scenario };
