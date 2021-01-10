const querystring = require('querystring');

const getQueryParamValueFromDidUri = (didUri, paramName) => {
  const qs = didUri.split('?').pop();
  return querystring.parse(qs)[paramName];
};

const isAsciiString = (data) => {
  return /^[\x00-\x7F]*$/.test(data);
};

const isValidURL = (data) => {
  let valid = false;
  try {
    new URL(data);
    valid = true;
  } catch (error) {}
  return valid;
};

module.exports = {
  isValidURL,
  isAsciiString,
  getQueryParamValueFromDidUri,
};
