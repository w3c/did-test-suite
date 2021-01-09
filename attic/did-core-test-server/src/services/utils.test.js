const {
  isAsciiString,
  encodeBufferAsBase64url,
  decodeBase64UrlToString,
} = require('./utils');

it('can generate non ascii string', () => {
  const encoded = encodeBufferAsBase64url(
    Buffer.from(new Uint8Array([60, 129, 130]))
  );
  expect(encoded).toEqual('PIGC');
  const decoded = decodeBase64UrlToString(encoded);
  expect(isAsciiString(decoded)).toBe(false);
});
