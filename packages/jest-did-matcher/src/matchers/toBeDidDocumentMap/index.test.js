import each from 'jest-each';

import matcher from '.';

expect.extend(matcher);


describe('.toBeDidDocumentMap', () => {
  each([
    [
        {
            "a": "1"
        }
    ],
    [
        {
            "b": [ "1", "2", "3" ]
        },
    ],
    [
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
        },
    ],
    [new Map(Object.entries({ a: "1", b: "2", c: {"x": "1", "y": "2"}}))],
    [new Set(["1", "2", "3", ["4", "5", "6"], {"x":"1", "y": "2"}])]
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
    [new Map(Object.entries({ a: NaN, b: "2", c: {"x": "1", "y": "2"}}))],
    [new Map(Object.entries({ a: "1", b: "2", c: {"x": NaN, "y": "2"}}))],
    [new Map(Object.entries({ a: "1", b: undefined, c: {"x": "1", "y": "2"}}))],
    [new Map(Object.entries({ a: "1", b: "2", c: {"x": "1", "y": undefined}}))],
    [new Set(["1", "2", "3", ["4", NaN, "6"], {"x":"1", "y": "2"}])],
    [new Set(["1", "2", "3", ["4", "5", undefined], {"x":"1", "y": "2"}])],
    [new Set(["1", "2", "3", ["4", "5", "6"], {"x": undefined, "y": "2"}])],
    [new Set(["1", "2", "3", ["4", "5", "6"], {"x": "1", "y": undefined }])]
  ]).test('passes when item is not of type DID Document map: %s', given => {
    expect(given).not.toBeDidDocumentMap();
  });
});
