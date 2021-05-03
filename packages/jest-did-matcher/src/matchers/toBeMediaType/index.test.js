import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeMediaType', () => {
  each([
    ["application/did+json"],
    ["application/did+ld+json"]
  ]).test('passes when given the item is valid Media Type: %s', given => {
    expect(given).toBeMediaType();
  });
});

describe('.not.toBeMediaType', () => {
  each([
    [""],
    [false],
    [0],
    [{}],
    [[]],
    [() => {}],
    [null],
    [undefined],
    [NaN]
  ]).test('passes when the item is not a valid Media Type: %s', given => {
    expect(given).not.toBeMediaType();
  });
});
