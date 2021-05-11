import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeDidCoreDatetime', () => {
  each([
    ["2021-03-18T09:30:10Z"],
    ["2020-12-20T19:17:47Z"],
    ["2021-02-28T09:30:10Z"],
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
    ["2020-20-20T19:17:47Z"],
    ["2020-13-20T19:17:47Z"],
    ["2020-12-32T19:17:47Z"],
    ["2020-12-40T19:17:47Z"],
    ["2020-12-20T30:17:47Z"],
    ["2020-12-20T25:17:47Z"],
    ["2020-12-20T23:61:47Z"],
    ["2020-12-20T25:17:61Z"],
    ["2021-02-29T23:61:47Z"],
  ]).test('passes when the item is not a valid DID Core Datetime: %s', given => {
    expect(given).not.toBeDidCoreDatetime();
  });
});
