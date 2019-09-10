# W3C Decentralized Identifiers Working Group Test Suite

![W3C Logo](https://www.w3.org/Icons/w3c_home)

# Test Suite and Implementation Report

This is the repository of the W3C’s note on Test Suite and Implementation
Report, developed by the [DID Working Group](https://www.w3.org/2019/did-wg/).

## Decentralized Identifiers 1.0 Test Suite

This test suite will check any application that generates 
[Decentralized Identifier](https://w3c.github.io/did-spec/) documents to
ensure conformance with the specification.

### Creating a Binary
You web application will need to be accessible from the command line. It
will also need to accept the following command line parameters:
```
Usage: <your_program> [options] [command]

Options:
  -?, --question                         //TODO add commands
  -h, --help                             output usage information

Commands:
  validate? // TODO commands
```
All tests will run against your binary and assume that an exit code greater
than 0 represents an error.

### Creating a config file
An example local configuration for the test suite. To use:

1. Copy the file config.json.example to a new file called config.json.
2. Modify the file and replace with appropriate values for your system.

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
