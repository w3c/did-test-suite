const querystring = require('querystring');
const base64url = require('base64url');
const getQueryParamValueFromDidUri = (didUri, paramName) => {
  const qs = didUri.split('?').pop();
  return querystring.parse(qs)[paramName];
};

const isAsciiString = (data) => {
  return /^[\x00-\x7F]*$/.test(data);
};

const decodeBase64UrlToString = (encoded) => {
  return base64url.decode(encoded);
};
const encodeBufferAsBase64url = (buffer) => {
  return base64url.encode(buffer);
};

const generateScenarioResults = (assertions) => {
  return (scenario) => {
    let assertion_results = {};

    Object.keys(assertions).forEach((assertion) => {
      assertion_results = {
        ...assertion_results,
        [assertion]: assertions[assertion](scenario),
      };
    });

    const test_result = Object.values(assertion_results).every((result) => {
      return result === true;
    });

    return {
      scenario: scenario.name,
      test: test_result ? 'PASS' : 'FAIL',
      assertion_results,
    };
  };
};

module.exports = {
  generateScenarioResults,
  isAsciiString,
  getQueryParamValueFromDidUri,
  decodeBase64UrlToString,
  encodeBufferAsBase64url,
};
