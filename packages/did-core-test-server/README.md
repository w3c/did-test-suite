### Jest Test Server

See [The DID Core Test Suite](https://w3c.github.io/did-test-suite/) for motivation.

This module exposes a set of jest suites that operate on custom json configurations as an async function `getReportResults`.

## Usage

You may need to [install node.js](https://nodejs.org/en/).
You may also need to [install docker](https://docs.docker.com/get-docker/).

```
git clone git@github.com:w3c/did-test-suite.git
npm i
cd ./packages/did-core-test-suite
```

The suites can be tests manually, using:

```
npm run generate-report
```

Or via http,

```
npm run start
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

```
npm run test
npm run start
npm run docker:build
npm run docker:publish
npm run docker:run
```
