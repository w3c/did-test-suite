import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeValidUri', () => {
  each([
    ["did:example:123"],
    ["did:example:123456789abcdefghi"]
  ]).test('passes when given the item is valid URI: %s', given => {
    expect(given).toBeValidUri();
  });
});

describe('.not.toBeValidUri', () => {
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
  ]).test('passes when the item is not a valid URI: %s', given => {
    expect(given).not.toBeValidUri();
  });
});
