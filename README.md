# ![W3C Logo](https://www.w3.org/Icons/w3c_home) DID Test Suite

[![Only Passing](https://github.com/w3c/did-test-suite/actions/workflows/ci-only-passing.yml/badge.svg)](https://github.com/w3c/did-test-suite/actions/workflows/ci-only-passing.yml) [![Include Breaking](https://github.com/w3c/did-test-suite/actions/workflows/ci-include-breaking.yml/badge.svg)](https://github.com/w3c/did-test-suite/actions/workflows/ci-include-breaking.yml)

This test suite performs interoperability tests on the W3C
[Decentralized Identifier](https://www.w3.org/TR/did-core/) specification and
is maintained by the W3C [DID Working Group](https://www.w3.org/2019/did-wg/).

## Adding Your DID Implementation

There are three types of implementations that this test suite tests:
DID Methods, DID Resolvers, and DID URL Dereferencers. In order to add
your implementation to this test suite:

1. Add your input file(s) to the [implementations](https://github.com/w3c/did-test-suite/tree/main/packages/did-core-test-server/suites/implementations) directory. For an example, see the [example DID Method implementation](https://github.com/w3c/did-test-suite/blob/main/packages/did-core-test-server/suites/implementations/did-example-didwg.json) (or any other file that looks closest to your implementation in the directory).
2. Add your input file to all relevant `default.js` test suite configurations. For example, DID Methods should add themselves to the did-identifier, did-core-properties, did-production, and did-consumption suites. Resolver implementations should only be added to the did-resolution test suite. See the [current list of implementations listed for did-core-properties](https://github.com/w3c/did-test-suite/blob/main/packages/did-core-test-server/suites/did-core-properties/default.js) for more information. Implementers might want to peruse the [list of all the test suites](https://github.com/w3c/did-test-suite/tree/main/packages/did-core-test-server/suites) for more detail.
3. Run the test suite and make sure your implementation passes.
4. Submit a pull request on this repository to add your implementation.

## Adding and Modifying Tests

Use the standard fork, branch, and pull request workflow to propose changes
to the test suite. Please make branch names informative—by including the
issue or bug number for example.

Editorial changes that improve the readability of the spec or correct
spelling or grammatical mistakes are welcome.

Please read [CONTRIBUTING.md](CONTRIBUTING.md), about licensing
contributions.

## Code of Conduct

W3C functions under a [code of conduct](https://www.w3.org/Consortium/cepc/).

## Getting Started

See the [Test Server](./packages/did-core-test-server).

To generate a report, run:

```npm
npm i
npm run test-and-generate-report
```

## If tests are failing

- Every time after updating any code, run `npm i`.
- Please refer to [When you observe errors section in packages/did-core-test-server/README.md](packages/did-core-test-server/README.md#when-you-observe-errors)
## DID Working Group Repositories

- [W3C Decentralized Identifier Specification v1.0](https://github.com/w3c/did-core)
- [Home page of the Decentralized Identifier Working Group](https://github.com/w3c/did-wg)
- [Specs and documentation for all DID-related /.well-known resources](https://github.com/decentralized-identity/.well-known)
- [W3C Decentralized Characteristics Rubric v1.0](https://github.com/w3c/did-rubric)
- [Decentralized Identifier Use Cases v1.0](https://github.com/w3c/did-use-cases)
- [W3C DID Test Suite and Implementation Report](https://github.com/w3c/did-test-suite)
