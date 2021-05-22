import each from 'jest-each';

import matcher from '.';

expect.extend(matcher);

describe('.toBeDidDocumentMap', () => {
  each([
    [
        {
            "a": "1"
        },
        {
            "b": [ "1", "2", "3" ]
        },
        {
            "didDocumentMetadata": {
                "canonicalId":"x",
                "equivalentId":[
                  "x",
                  "y"
                ],
                "method":{
                  "updateCommitment":"z",
                  "recoveryCommitment":"t",
                  "published":true
                }
            }
        }
    ],
  ]).test('passes when item is a type allowed in a DID Document map: %s', given => {
    expect(given).toBeDidDocumentMap();
  });
});

describe('.not.toBeDidDocumentMap', () => {
  each([
    [{ "v" : 0 }],
    [{ "v" : undefined }],
    [{ "v" : NaN }],
    [{"didDocumentMetadata": {
        "canonicalId":NaN,
        "equivalentId":[
          "x",
          "y"
        ],
        "method":{
          "updateCommitment":"z",
          "recoveryCommitment":"t",
          "published":true
        }
    }}],
    [{"didDocumentMetadata": {
        "canonicalId":"i",
        "equivalentId":[
          NaN,
          "y"
        ],
        "method":{
          "updateCommitment":"z",
          "recoveryCommitment":"t",
          "published":true
        }
    }}],
  ]).test('passes when not item is not of type DID Document map: %s', given => {
    expect(given).not.toBeDidDocumentMap();
  });
});
