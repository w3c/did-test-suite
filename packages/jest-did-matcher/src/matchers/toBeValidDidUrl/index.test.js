import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeValidDidUrl', () => {
  each([
    ["did:example:123"],
    ["did:example:123456789abcdefghi"],
    ["did:example:123#ZC2jXTO6t4R501bfCXv3RxarZyUbdP2w_psLwMuY6ec"],
    ["did:example:123#keys-1"],
    ["did:example:123456/path"],
    ["did:example:123456/path/mutiple/path"],
    ["did:example:123456/path%20with%20space"],
    ["did:example:123456?versionId=1"],
    ["did:example:123#public-key-0"],
    ["did:example:123?service=agent&relativeRef=/credentials#degree"]
  ]).test('passes when the item is a valid DID: %s', given => {
    expect(given).toBeValidDidUrl();
  });
});

describe('.not.toBeValidDidUrl', () => {
  each([
    ["STRING"],
    [false],
    [0],
    [undefined],
    [null],
    [NaN],
    ["did:"],
    ["did:example"]
  ]).test('passes when the item is not a valid DID: %s', given => {
    expect(given).not.toBeValidDidUrl();
  });
});
