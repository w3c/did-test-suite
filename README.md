# W3C Decentralized Identifiers Working Group Test Suite

![W3C Logo](https://www.w3.org/Icons/w3c_home)

# Test Suite and Implementation Report

This is the repository of the W3C’s note on Test Suite and Implementation
Report, developed by the [DID Working Group](https://www.w3.org/2019/did-wg/).

## Decentralized Identifiers 1.0 Test Suite

This test suite will check any application that generates
[Decentralized Identifier](https://w3c.github.io/did-core/) documents to
ensure conformance with the specification.

## Contributing to the Repository

Use the standard fork, branch, and pull request workflow to propose changes
to the test suite. Please make branch names informative—by including the
issue or bug number for example.

Editorial changes that improve the readability of the spec or correct
spelling or grammatical mistakes are welcome.

Please read [CONTRIBUTING.md](CONTRIBUTING.md), about licensing
contributions.

## Code of Conduct

W3C functions under a [code of conduct](https://www.w3.org/Consortium/cepc/).

## Usage

You may need to [install node.js](https://nodejs.org/en/).

```
git clone git@github.com:w3c/did-test-suite.git
npm i
```

You may also need to [install docker](https://docs.docker.com/get-docker/).

To update the test report, run this command from the root directory of this repository:

```
npm run update-test-report
```

### Test Server

[did-core-test-server](./packages/did-core-test-server)

This module is responsible for evaluating "test scenarios".

To run this server, simply run this command from the root directory of this repository:

```
npm run start
```

### Test Fixtures

[did-core-test-vectors](./packages/did-core-test-vectors)

This module is responsible for asking storing "test scenario" inputs and expected outputs.

You can run these tests without starting the test server.

Simply run this command from the `did-core-test-vectors` directory:

```
npm run test
```

When test in this module run, they compare the results of running tests against the latest source code in the `test-server`, with the expected outputs.

If a test fails, a fixture will need to be updated.

The `test-server` is the source of truth, fixtures tests are just a way of covering that truth with tests.

DO NOT attempt to update the `test-server` to get a fixture test to pass.

Test implementers may find it useful to write unit tests in `test-server` before attempting test fixture tests.

## What is a scenario?

A scenario is defined in JSON, for example "resolve"

```
{
  "name": "resolve",
  "input": {
    "did": "did:example:123",
    "did-resolution-input-metadata": {}
  },
  "output": {
    "did-document": {
      "id": "did:example:123"
    },
    "did-document-metadata": {},
    "did-resolution-metadata": {}
  }
}
```

A JSON object representing the scenario is posted to the server,

A small javascript function processes the request and returns a response:

```
const assertions = {
  "did should match did-document id": (scenario) => {
    return scenario.input.did === scenario.output["did-document"].id;
  },
};

const testResolve = (scenario) => {
  let assertion_results = {};

  Object.keys(assertions).forEach((assertion) => {
    assertion_results = {
      ...assertion_results,
      [assertion]: assertions[assertion](scenario),
    };
  });

  const test_result = Object.values(assertion_results).every((result) => {
    return result === true;
  });

  return {
    scenario: scenario.name,
    test: test_result ? "PASS" : "FAIL",
    assertion_results,
  };
};
```

For example:

```
{
  "scenario": "resolve",
  "test": "PASS",
  "assertion_results": { "did should match did-document id": true }
}
```

Multiple scenarios can be submitted at once:

```
curl -s -X POST http://localhost:8080/test \
-H "Content-Type: application/json" \
-d @./packages/did-core-test-vectors/src/__fixtures__/example/test-all.json \
| jq '.'
```

And all results are produced as json:

```
❯ curl -s -X POST http://localhost:8080/test \
-H "Content-Type: application/json" \
-d @./packages/did-core-test-vectors/src/__fixtures__/example/test-all.json \
| jq '.'
{
  "test": "PASS",
  "scenarios": [
    {
      "scenario": "resolve",
      "test": "PASS",
      "assertion_results": {
        "did should match did-document id": true
      }
    }
  ]
}
```

## Designing Scenarios

Scenarios can be simple or complex, but they require a vendor to be honest about the inputs and outputs of their system with respect to the did core data model.

A vendor might write extra software to be able to autoamtically generate scenarios for validation.

If a concept can't be represented via a JSON data model and some small javascript program that validates it, it cannot be tested.

## Presentation of Test Results

With more time, test results might be better structured for being consumed in 3rd party software.

### Run Docker Image

```
docker run --publish 3000:3000 --detach --name dcts or13/did-core-test-server:1.0
```

### Run Server Locally

```
npm run docker:up
```

## DID Working Group Repositories

- [W3C Decentralized Identifier Specification v1.0](https://github.com/w3c/did-core)
- [Home page of the Decentralized Identifier Working Group](https://github.com/w3c/did-wg)
- [Specs and documentation for all DID-related /.well-known resources](https://github.com/decentralized-identity/.well-known)
- [W3C Decentralized Characteristics Rubric v1.0](https://github.com/w3c/did-rubric)
- [Decentralized Identifier Use Cases v1.0](https://github.com/w3c/did-use-cases)
- [W3C DID Test Suite and Implementation Report](https://github.com/w3c/did-test-suite)
