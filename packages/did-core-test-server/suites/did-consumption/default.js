module.exports = {
  conformingConsumers: [{
    "name": "non-conforming DID",
    "input": {
      "mediaType": "application/did+ld+json",
      "representation": "{\"id\":\"not-a-did:true\",\"@context\":[\"https://www.w3.org/ns/did/v1\"]}"
    },
    "output": {
      "didDocumentDataModel": {
        "id": "not-a-did:true"
      },
      "representationSpecificEntries": {
        "@context": ["https://www.w3.org/ns/did/v1"]
      },
      "errors": [
        "invalidDid"
      ]
    }
  },
  {
    "name": "non-conforming DID Document",
    "input": {
      "mediaType": "application/did+ld+json",
      "representation": "{\"@context\":[\"https://www.w3.org/ns/did/v1\"]}"
    },
    "output": {
      "didDocumentDataModel": {},
      "representationSpecificEntries": {
        "@context": ["https://www.w3.org/ns/did/v1"]
      },
      "errors": [
        "missingId"
      ]
    }
  },
  {
    "name": "did:example:123",
    "input": {
      "mediaType": "application/did+ld+json",
      "representation": "{\"id\":\"did:example:123\",\"@context\":[\"https://www.w3.org/ns/did/v1\"]}",
      "options": {}
    },
    "output": {
      "didDocumentDataModel": {
        "id": "did:example:123"
      },
      "representationSpecificEntries": {
        "@context": ["https://www.w3.org/ns/did/v1"]
      },
      "errors": []
    }
  }]
}
