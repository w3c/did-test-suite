import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeValidUrl', () => {
  each([
    ["http://www.w3.org/"],
    ["https://www.w3.org/"],
  ]).test('passes when given the item is valid URL: %s', given => {
    expect(given).toBeValidUrl();
  });
});

describe('.not.toBeValidUrl', () => {
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
  ]).test('passes when the item is not a valid URL: %s', given => {
    expect(given).not.toBeValidUrl();
  });
});
