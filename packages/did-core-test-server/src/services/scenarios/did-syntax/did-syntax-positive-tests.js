const {
  isAsciiString,
  getQueryParamValueFromDidUri,
  generateScenarioResults,
} = require('../../utils');

const assertions = {
  'DID MUST be a valid URL.': (scenario) => {
    for (i in scenario.input.dids) {
      let did = scenario.input.dids[i];
      let valid = undefined;
      try { new URL(did); valid = true; } catch (error) { valid = false; };
      if (! valid) return false;
    }
    return true;
  },
  'The URI scheme MUST be "did:".': (scenario) => {
    for (i in scenario.input.dids) {
      let did = scenario.input.dids[i];
      let scheme = new URL(url.protocol);
      let valid = url.protocol === 'did:';
      if (! valid) return false;
    }
    return true;
  },
  'The DID method name MUST be an ASCII lowercase string.': (scenario) => {
    for (i in scenario.input.dids) {
      let did = scenario.input.dids[i];
      let path = new URL(did).pathname;
      let method_name = path.substring(0, path.indexOf(':'));
      let valid = method_name.toLowerCase() === method_name;
      if (! valid) return false;
    }
    return true;
  },
  'The DID method name MUST NOT be empty.': (scenario) => {
    for (i in scenario.input.dids) {
      let did = scenario.input.dids[i];
      let path = new URL(did).pathname;
      let method_name = path.substring(0, path.indexOf(':'));
      let valid = method_name !== '';
      if (! valid) return false;
    }
    return true;
  },
};
module.exports = generateScenarioResults(assertions);
