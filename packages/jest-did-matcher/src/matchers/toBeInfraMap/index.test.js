import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeInfraMap', () => {
  test('passes when given a INFRA map', () => {
    expect({}).toBeInfraMap();
  });
});

describe('.not.toBeInfraMap', () => {
  each([
    ["STRING"],
    [false],
    [0],
    [undefined],
    [null],
    [NaN]
  ]).test('passes when not item is not of type INFRA Map: %s', given => {
    expect(given).not.toBeInfraMap();
  });
});
