# W3C Decentralized Identifiers Working Group Test Suite

This repository contains the W3C
[CREDENTIALS COMMUNITY GROUP](https://www.w3.org/community/credentials/) test suite.
Any conforming implementation MUST pass all tests in the test suite.

There are multiple test suites, each of which is detailed below.

## Decentralized Identifiers 1.0 Test Suite

This test suite will check any application that generates [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) documents to
ensure conformance with the specification.

### Creating a Binary
You web application will need to be accessible from the command line. It will also need to accept the following command line parameters:
```
Usage: <your_program> [options] [command]

Options:
  -?, --question                         //TODO add commands
  -h, --help                             output usage information

Commands:
  validate? // TODO commands
```
All tests will run against your binary and assume that an exit code greater than 0 represents an error.

### Creating a config file
An example local configuration for the test suite. To use:

1. Copy this file to one called config.json.
2. Modify the file and replace with appropriate values for your system.
3. the generator should be a path to your binary.

```
{
  "generator": "../your-application/bin",
}
```

### Running the Test Suite

1. npm install
2. Copy the `config.json.example` file to `config.json` and modify.
3. All that is needed is a path to the binary that runs the tests
4. npm test

### Submit an Implementation Report

1. npm install
2. Copy the `config.json.example` file to `config.json` and modify.
3. npm run report
4. Rename implementation/results.json to
   implementation/YOUR_IMPLEMENTATION-results.json.
5. git add implementations/YOUR_IMPLEMENTATION-results.json and submit a
   pull request for your implementation.

## Contributing

You may contribute to this test suite by submitting pull requests here:

https://github.com/w3c-ccg/did-test-suite