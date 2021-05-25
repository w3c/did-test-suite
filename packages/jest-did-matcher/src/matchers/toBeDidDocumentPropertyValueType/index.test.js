import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeDidDocumentPropertyValueType', () => {
  each([
    ["String"],
    [new String()],
    [{}],
    [{ a: "1", b: "2", c: {"x": "1", "y": "2"}}],
    [new Map()],
    [new Map(Object.entries({ a: "1", b: "2", c: {"x": "1", "y": "2"}}))],
    [[]],
    [new Array(1)],
    [new Set()],
    [new Set(["1", "2", "3", ["4", "5", "6"], {"x":"1", "y": "2"}])],
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
