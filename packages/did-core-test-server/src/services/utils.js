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

module.exports = {
  isAsciiString,
  getQueryParamValueFromDidUri,
  decodeBase64UrlToString,
  encodeBufferAsBase64url,
};
