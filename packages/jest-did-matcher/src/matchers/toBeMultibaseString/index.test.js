import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeMultibaseString', () => {
  each([
    ["z98RNr73hGzPakwdrkjdk7BSn5Xd3ZbaVgJX122hqZAaMv19p"],
  ]).test('passes when given the item is Multibase String', given => {
    expect(given).toBeMultibaseString();
  });
});

describe('.not.toBeMultibaseString', () => {
  each([
    [false],
    [""],
    ["JKJKJK"],
    ["5!@)"],
    [0],
    [{}],
    [[]],
    [() => {}],
    [null],
    [undefined],
    [NaN]
  ]).test('passes when the item is not a Multibase String: %s', given => {
    expect(given).not.toBeMultibaseString();
  });
});
