### Jest Test Server

See [The DID Core Test Suite](https://w3c.github.io/did-test-suite/) for motivation.

This module exposes a set of jest suites that operate on custom json configurations as an async function `getReportResults`.

## Usage

You may need to [install node.js](https://nodejs.org/en/).
You may also need to [install docker](https://docs.docker.com/get-docker/).

```
git clone git@github.com:w3c/did-test-suite.git
npm i
cd ./packages/did-core-test-server
```

Important note: since this test suite depends on a local, non-published package [`jest-did-matcher`](../jest-did-matcher), please run `npm i` at the top-level of this repository to correctly configure the relationship of packages.

To test and generate a report at the root of the repository, run

```
npm run test-and-generate-report
```

Or via http,

```
npm run start
```

Or run only the test:

```
npm run test
```

### Testing with CURL

```
curl -s -X POST http://localhost:8080/test-suite-manager/generate-report \
-H "Content-Type: application/json" \
-d @./suites/did-spec/default.json \
| jq '.suitesReportJson[0]'
```

### Embedding

The test suite functionality can be embedded in any HTTP server,

See [example](./routes/index.js).

The following commands are available:

```
npm run test
npm run start
npm run docker:build
npm run docker:publish
npm run docker:run
npm run generate-test-data
npm run generate-report
npm run test-and-generate-report
```

## When you observe errors

- Run `npm i` at the top level of this repository. Running `npm i` guarantees every test code to build.
- Run `npm test` in `packages/did-core-test-server` directory.
  This way of test run will show detailed tests run. For example, the intentional change to 'did:' to 'did/' for example implementation cause this error:

    ```
  ● suites/did-identifier › IMPLEMENTATION ::DID Test Suite:: › 3.x Identifier - did:example - DID Test Suite - DID Working Group › 3.1 DID Syntax › did/example:123 › 3.1 DID Syntax - All DIDs MUST conform to the DID Syntax ABNF Rules.

    expect(received).toBeValidDid()

    Expected value to be of valid DID, but received:
      "did/example:123"

       7 |         it('3.1 DID Syntax - All DIDs MUST conform to the DID Syntax ' +
       8 |           'ABNF Rules.', async () => {
    >  9 |           expect(didExample).toBeValidDid();
         |                              ^
      10 |         });
      11 |       });
      12 |     });

      at Object.<anonymous> (suites/did-identifier/did-syntax.js:9:30)
    ```

- The first line begins with `●` (shown in red, if you didn't change test framework(jest) configuration). This descriptive text includes the name of test suites, the name of the implementation (marked IMPLEMENTATION), and the DID or DID URL (begins with `did:`) for the test, and also the section number of the DID core specification relates to the test.
- The second line shows how a test matcher (a test code idiom) applied.
- The third line shows the reason for the error, the value in question (received value), and possibly an expected value.
- If there are any errors in the test code itself, the second line may be a JavaScript error (E.g., `TypeError: Cannot read property '...' of undefined`). If this happens or found any anomalies, please open an issue at [ did-test-suite GitHub repository](https://github.com/w3c/did-test-suite/issues).
