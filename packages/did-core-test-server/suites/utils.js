const querystring = require('querystring');
const URI = require('uri-js');
const jose = require('jose');

const getQueryParamValueFromDidUri = (didUri, paramName) => {
  const qs = didUri.split('?').pop();
  return querystring.parse(qs)[paramName];
};

const isAsciiString = (data) => {
  return /^[\x00-\x7F]*$/.test(data);
};

const isValidBase58 = (value) => {
  const base58Regex = /^[a-km-zA-HJ-NP-Z1-9]+$/;

  return base58Regex.test(value);
};

const isValidDID = (did) => {
  const didRegex = /did:(?<method>[a-z0-9]+):(?<idchar>([a-zA-Z0-9.\-_]|%[0-9a-fA-F]{2})+)/;

  return didRegex.test(did);
};

const isValidJwk = (jwk) => {
  let valid = false;
  try {
    jose.JWK.asKey(jwk);
    valid = true;
  } catch (error) {
    // un comment to see JWKs that might 
    // be valid but not yet
    // widely supported, like BLS 12381
    // console.warn('invalid jwk', jwk)
  }
  // relaxed JWK public key check
  if (!jwk.d && jwk.kty){
    valid = true
  }
  return valid;
};

const isValidURI = (uri) => {
  // URI Regex is from RFC3986 Appendix B
  const uriRegex =
    /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

  return uriRegex.test(uri);
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
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/
  return regex.test(data)
};

const getAbsoluteDIDURL = (base, relativeURL) => {
  let absoluteURL = relativeURL;
  if(!relativeURL.startsWith('did:')) {
    absoluteURL = base + relativeURL;
  }
  return absoluteURL;
}

const isValidVerificationMethod = (vm) => {
  expect(vm).toHaveProperty('id');
  expect(vm).toHaveProperty('type');
  expect(vm).toHaveProperty('controller');
  expect(isValidDID(vm.id)).toBe(true);
  expect(typeof vm.type === 'string').toBe(true);
  expect(isValidDID(vm.controller)).toBe(true);

  const {publicKeyBase58} = vm;
  if(publicKeyBase58) {
    expect(isValidBase58(publicKeyBase58)).toBe(true);
  }

  const {publicKeyJwk} = vm;
  if(publicKeyJwk) {
    expect(isValidJwk(publicKeyJwk)).toBe(true);
    expect(publicKeyJwk).not.toHaveProperty('d');
    expect(publicKeyJwk).not.toHaveProperty('p');
    expect(publicKeyJwk).not.toHaveProperty('q');
    expect(publicKeyJwk).not.toHaveProperty('dp');
    expect(publicKeyJwk).not.toHaveProperty('dq');
    expect(publicKeyJwk).not.toHaveProperty('qi');
    expect(publicKeyJwk).not.toHaveProperty('oth');
    expect(publicKeyJwk).not.toHaveProperty('k');
  }

  if(publicKeyBase58 !== undefined && publicKeyJwk !== undefined) {
    throw new Error('Both publicKeyJwk and publicKeyBase58 are ' +
      'defined at the same time.');
  }

  return true;
}

module.exports = {
  getAbsoluteDIDURL,
  getQueryParamValueFromDidUri,
  isAsciiString,
  isValidBase58,
  isValidDID,
  isValidJwk,
  isValidURI,
  isValidURL,
  isXmlDatetime,
  isAsciiString,
  getQueryParamValueFromDidUri,
  isValidVerificationMethod
};
