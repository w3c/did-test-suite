### Jest Test Server

This module exposes a set of jest suites that operate on custom json configurations as an async function `getReportResults`.

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
| jq '.suiteReportJson[0]'
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
