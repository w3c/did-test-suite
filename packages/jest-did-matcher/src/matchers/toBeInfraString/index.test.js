import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeInfraString', () => {
  test('passes when given a INFRA String', () => {
    expect("").toBeInfraString();
    expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ").toBeInfraString();
    expect("abcdefghijklmnopqrstuvwxyz").toBeInfraString();
  });
});

describe('.not.toBeInfraString', () => {
  each([
    [false],
    [0],
    [{}],
    [[]],
    [() => {}],
    [undefined],
    [null],
    [NaN]
  ]).test('passes when not item is not of type INFRA String: %s', given => {
    expect(given).not.toBeInfraString();
  });
});
