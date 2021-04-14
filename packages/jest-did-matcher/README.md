# Additional Jest Matchers for Decentralized Identifier specs

This package helps write tests for Decentralized Identifier (DID).
Developed based on the structure of [jest/community/jest-extended](https://github.com/jest-community/jest-extended) package.

## Currently Implemented Matchers and Predicates

- JavaScript and common types
  - toBeAsciiString / isAsciiString
- INFRA specific tests
  - toBeInfraMap / isInfraMap
  - toBeInfraString / isInfraString
- DID Core specific tests
  - toBeValidDid / isValidDid
- Various encoding formats
  - toBeBase58String / isBase58String

## Targets

Since the package relys on Babel, it require build.
If you changed part of the code, build and commit the result in `./dist`

For the test of this package itself, run `npm test`

## Reference from did-core-test-server

`../did-core-test-server/package.json` contains filesytem relative reference to this package.
