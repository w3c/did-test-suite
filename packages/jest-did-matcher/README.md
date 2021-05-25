# Additional Jest Matchers for Decentralized Identifier specs

This package helps write tests for Decentralized Identifier (DID).
Developed based on the structure of [jest/community/jest-extended](https://github.com/jest-community/jest-extended) package.

To use this package, run `npm run prepare` for preparing runtime JavaScripts in `./dist` directory.
You can also prepare by running `npm run prepare` at the top level of `did-test-suite`.

## Currently Implemented Matchers and Predicates

- JavaScript and common types
  - toBeAsciiString / isAsciiString
- Generic Web related
  - toBeValidUrl / isValidUrl
  - toBeValidUri / isValidUri
- INFRA specific tests
  - toBeInfraMap / isInfraMap
  - toBeInfraString / isInfraString
- DID Core specific tests
  - toBeValidDid / isValidDid
  - toBeValidDidUrl / isValidDidUrl
  - toBeDidCoreDatetime / isDidCoreDatetime
  - toBeDidDocumentMap / isDidDocumentMap
  - toBeDidDocumentPropertyValueType / isDidDocumentPropertyValueType
- Various encoding formats
  - toBeBase58String / isBase58String
  
## Targets

Since the package relys on Babel, it require build.
If you changed part of the code, build and commit the result in `./dist`

For the test of this package itself, run `npm test`

## Reference from did-core-test-server

`../did-core-test-server/package.json` contains filesytem relative reference to this package.

## Predicates design policy

Since this is a matcher for testing, all of the predicates are stricter than standard definition.
The following is the list of design choices made.

- Following predicates check whether the target is string or not, to not allow `NaN` or `undefined` as a value
  - toBeAsciiString
  - toBeBase58String
  - toBeValidUri
- toBeValidUri: not allowing empty URI
