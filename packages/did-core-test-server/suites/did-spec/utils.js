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

const isXmlDatetime = (data) => {
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/
  return regex.test(data)
};

const isValidDID = (did) => {
  const didRegex = /did:(?<method>[a-z0-9]+):(?<idchar>[a-zA-Z0-9:\\-_]+)/;

  return didRegex.test(did);
};

module.exports = {
  isValidDID,
  isValidURL,
  isXmlDatetime,
  isAsciiString,
  getQueryParamValueFromDidUri,
};
