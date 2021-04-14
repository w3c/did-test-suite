# Additional Jest Matchers for Decentralized Identifier specs

This package helps write tests for Decentralized Identifier (DID).
Developed based on the structure of [jest/community/jest-extended](https://github.com/jest-community/jest-extended) package.

## Currently Implemented

- toBeAsciiString and isAsciiString to test whether the object is an ASCII string or not
- toBeBase58String and isBase58String to test whether the object is an Base58 string or not
- toBeInfraMap and isInfraMap to test whether the object is an INFRA map or not
- toBeInfraString and isInfraString to test whether the object is an INFRA string or not
- toBeValidDid and isValidDid to test whether the object is a DID string or not

## Targets

Since the package relys on Babel, it require build.
If you changed part of the code, build and commit the result in `./dist`

For the test of this package itself, run `npm test`

## Reference from did-core-test-server

`../did-core-test-server/package.json` contains filesytem relative reference to this package.
