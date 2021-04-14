import each from 'jest-each';

import matcher from './';

expect.extend(matcher);

describe('.toBeAsciiString', () => {
  test('passes when given a INFRA String', () => {
    for (let i = 0; i <= 0x1F; i++) {
      expect(String.fromCharCode(i)).toBeAsciiString();
    }
    expect(' !"#$%&\'()*+,-./').toBeAsciiString();
    expect('0123456789:;<=>?').toBeAsciiString();
    expect('@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_').toBeAsciiString();
    expect('`abcdefghijklmnopqrstuvwxyz{|}~\x7F').toBeAsciiString();
  });
});

describe('.not.toBeAsciiString', () => {
  each([
    [false],
    ["\x80"],
    ["\xFf"],
    [0],
    [{}],
    [[]],
    [() => {}],
    [undefined],
    [null],
    [NaN]
  ]).test('passes when not item is not of type INFRA String: %s', given => {
    expect(given).not.toBeAsciiString();
  });
});
