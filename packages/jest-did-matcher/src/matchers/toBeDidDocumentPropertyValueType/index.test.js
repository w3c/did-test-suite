import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeDidDocumentPropertyValueType', () => {
  each([
    ["String"],
    [new String],
    [{}],
    [new Map],
    [[]],
    [new Array],
    [new Set],
    [true],
    [false],
    [null]
  ]).test('passes when item is a type allowed in a DID Document map: %s', given => {
    expect(given).toBeDidDocumentPropertyValueType();
  });
});

describe('.not.toBeDidDocumentPropertyValueType', () => {
  each([
    [0],
    [undefined],
    [NaN]
  ]).test('passes when not item is not of type DID Document map: %s', given => {
    expect(given).not.toBeDidDocumentPropertyValueType();
  });
});
