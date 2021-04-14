import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeBase58String', () => {
  each([
    ["98RNr73hGzPakwdrkjdk7BSn5Xd3ZbaVgJX122hqZAaMv19p"],
  ]).test('passes when given the item is Base58 String', given => {
    expect(given).toBeBase58String();
  });
});

describe('.not.toBeBase58String', () => {
  each([
    [false],
    [""],
    [0],
    [{}],
    [[]],
    [() => {}],
    [null],
    [undefined],
    [NaN]
  ]).test('passes when the item is not a Base58 String: %s', given => {
    expect(given).not.toBeBase58String();
  });
});
