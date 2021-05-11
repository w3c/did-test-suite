import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeDidCoreDatetime', () => {
  each([
    ["2021-03-18T09:30:10Z"],
    ["2020-12-20T19:17:47Z"]
  ]).test('passes when given the item is valid DID Core Datetime: %s', given => {
    expect(given).toBeDidCoreDatetime();
  });
});

describe('.not.toBeDidCoreDatetime', () => {
  each([
    [""],
    [false],
    [0],
    [{}],
    [[]],
    [() => {}],
    [null],
    [undefined],
    [NaN],
    ["2020-12-20T19:17:47.000Z"],
    ["2020-12-20T19:17:47.100Z"],
    ["2020-12-20T19:17:47+09:00"],
    ["2020-12-20T19:17:47+0900"],
    ["2020-12-20T19:17:47+09"],
    ["2020-12-20T19:17:47I"],
  ]).test('passes when the item is not a valid DID Core Datetime: %s', given => {
    expect(given).not.toBeDidCoreDatetime();
  });
});
