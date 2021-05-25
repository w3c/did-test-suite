const utils = require('../utils');
const {
  isValidDID, isValidURI, isValidBase58, isValidJwk, isValidVerificationMethod,
  getAbsoluteDIDURL
} = utils;
const jose = require('node-jose');

const jsonMediaTypes = ['application/did+ld+json', 'application/did+json'];

const generateDidCorePropertiesTests = (
  {did, didDocumentDataModel, resolutionResult}) => {
  const didDocument = didDocumentDataModel.properties;

  it('5.1.1 DID Subject - The value of id MUST be a string that ' +
    'conforms to the rules in § 3.1 DID Syntax and MUST exist in the root ' +
    'map of the data model for the DID document.', async () => {
      expect(didDocument).toHaveProperty('id');
      expect(didDocument.id).toBeValidDid();
  });

  it('5.1.2 DID Controller - The controller property is OPTIONAL. If ' +
    'present, the value MUST be a string or an ordered set of strings that ' +
    'conform to the rules in § 3.1 DID Syntax.', async () => {
      const {controller} = didDocument;
      if(controller) {
        const controllers =
          (Array.isArray(controller)) ? controller : [controller];
        controllers.forEach(didController => {
          expect(didController).toBeValidDid();
        });
      }
  });

  const {alsoKnownAs} = didDocument;
  if(alsoKnownAs) {
    it('5.1.3 Also Known As - The alsoKnownAs property is OPTIONAL. If ' +
        'present, the value MUST be an ordered set where each item in the set ' +
        'is a URI conforming to [RFC3986].', async () => {
      expect(alsoKnownAs).toBeArray();
      alsoKnownAs.forEach(alsoKnownAsValue => {
        expect(alsoKnownAsValue).toBeValidUri();
      });
    });
  }

  it('5.2 Verification Methods - The verificationMethod property is ' +
    'OPTIONAL. If present, the value MUST be an ordered set of verification ' +
    'methods, where each verification method is expressed using a map.',
    async () => {
      const {verificationMethod} = didDocument;
      if(verificationMethod) {
        expect(verificationMethod).toBeArray();
        verificationMethod.forEach(verificationMethodValue => {
          expect(verificationMethodValue).toBeInfraMap();
        });
      }
  });

  it('5.2 Verification Methods - The verification method map MUST include ' +
    'the id, type, controller, and specific verification material properties ' +
    'that are determined by the value of type and are defined in ' +
    '§ 5.2.1 Verification Material.', async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        expect(vm).toHaveProperty('id');
        expect(vm).toHaveProperty('type');
        expect(vm).toHaveProperty('controller');
      });
  });

  it('5.2 Verification Methods - The value of the id property for a ' +
    'verification method MUST be a string that conforms to the rules in ' +
    'Section § 3.2 DID URL Syntax.', async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        let absoluteURL = getAbsoluteDIDURL(didDocument.id,vm.id);
        expect(absoluteURL).toBeValidDidUrl();
      });
  });

  it('5.2 Verification Methods - The value of the type property MUST be ' +
    'a string that references exactly one verification method type.',
    async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        expect(vm.type).toBeInfraString();
      });
  });

  it('5.2 Verification Methods - The value of the controller property ' +
    'MUST be a string that conforms to the rules in § 3.1 DID Syntax.',
    async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        expect(vm.controller).toBeValidDid();
      });
  });

  it('5.2 Verification Methods - The publicKeyMultibase property is ' +
    'OPTIONAL. This feature is non-normative. If present, the value MUST be a' +
    'string representation of a [MULTIBASE] encoded public key.', async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        const {publicKeyMultibase} = vm;
        if(publicKeyMultibase) {
          expect(publicKeyMultibase).toBeMultibaseString();
        }
      });
  });

  it('5.2 Verification Methods - The publicKeyJwk property is OPTIONAL. ' +
    'If present, the value MUST be a map representing a JSON Web Key that ' +
    'conforms to [RFC7517].', async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        const {publicKeyJwk} = vm;
        if(publicKeyJwk) {
          expect(isValidJwk(publicKeyJwk)).toBe(true);
        }
      });
  });

  it('5.2 Verification Methods - The map MUST NOT contain "d", or any ' +
    'other members of the private information class as described in ' +
    'Registration Template.', async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        const {publicKeyJwk} = vm;
        if(publicKeyJwk) {
          expect(publicKeyJwk).not.toHaveProperty('d');
          expect(publicKeyJwk).not.toHaveProperty('p');
          expect(publicKeyJwk).not.toHaveProperty('q');
          expect(publicKeyJwk).not.toHaveProperty('dp');
          expect(publicKeyJwk).not.toHaveProperty('dq');
          expect(publicKeyJwk).not.toHaveProperty('qi');
          expect(publicKeyJwk).not.toHaveProperty('oth');
          expect(publicKeyJwk).not.toHaveProperty('k');
        }
      });
  });

  it('5.2.1 Verification Material - A verification method MUST NOT ' +
    'contain multiple verification material properties for the same ' +
    'material. For example, expressing key material in a verification method ' +
    'using both publicKeyJwk and publicKeyMultibase at the same time is ' +
    'prohibited.',
    async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        const {publicKeyBase58} = vm;
        const {publicKeyMultibase} = vm;
        const {publicKeyJwk} = vm;
        let count = 0;
        count =
          (publicKeyBase58 === undefined) ? count : count + 1;
        count =
          (publicKeyMultibase === undefined) ? count : count + 1;
        count =
          (publicKeyJwk === undefined) ? count : count + 1;

        if(count > 1) {
          throw new Error('Multiple key material values are ' +
            'defined for the same verification method.');
        }
      });
  });

  it('5.3.1 Authentication - The authentication property is OPTIONAL. ' +
    'If present, the associated value MUST be an ordered set of one or more ' +
    'verification methods.', async () => {
      const {authentication} = didDocument;
      authentication?.forEach(vm => {
        if(typeof vm === 'string') {
          let absoluteURL = getAbsoluteDIDURL(didDocument.id, vm);
          expect(absoluteURL).toBeValidDidUrl();
        } else {
          expect(isValidVerificationMethod(vm)).toBe(true);
        }
      });
  });

  it('5.3.2 Assertion - The assertionMethod property is OPTIONAL. If ' +
    'present, the associated value MUST be an ordered set of one or more ' +
    'verification methods.', async () => {
      const {assertionMethod} = didDocument;
      assertionMethod?.forEach(vm => {
        if(typeof vm === 'string') {
          let absoluteURL = getAbsoluteDIDURL(didDocument.id, vm);
          expect(absoluteURL).toBeValidDidUrl();
        } else {
          expect(isValidVerificationMethod(vm)).toBe(true);
        }
      });
  });

  it('5.3.3 Key Agreement - The keyAgreement property is OPTIONAL. If ' +
    'present, the associated value MUST be an ordered set of one or more ' +
    'verification methods.', async () => {
      const {keyAgreement} = didDocument;
      keyAgreement?.forEach(vm => {
        if(typeof vm === 'string') {
          let absoluteURL = getAbsoluteDIDURL(didDocument.id, vm);
          expect(absoluteURL).toBeValidDidUrl();
        } else {
          expect(isValidVerificationMethod(vm)).toBe(true);
        }
      });
  });

  it('5.3.4 Capability Invocation - The capabilityInvocation property ' +
    'is OPTIONAL. If present, the associated value MUST be an ordered set of ' +
    'one or more verification methods.', async () => {
      const {capabilityInvocation} = didDocument;
      capabilityInvocation?.forEach(vm => {
        if(typeof vm === 'string') {
          let absoluteURL = getAbsoluteDIDURL(didDocument.id, vm);
          expect(absoluteURL).toBeValidDidUrl();
        } else {
          expect(isValidVerificationMethod(vm)).toBe(true);
        }
      });
  });

  it('5.3.5 Capability Delegation - The capabilityDelegation property ' +
    'is OPTIONAL. If present, the associated value MUST be an ordered set of ' +
    'one or more verification methods.', async () => {
      const {capabilityDelegation} = didDocument;
      capabilityDelegation?.forEach(vm => {
        if(typeof vm === 'string') {
          let absoluteURL = getAbsoluteDIDURL(didDocument.id, vm);
          expect(absoluteURL).toBeValidDidUrl();
        } else {
          expect(isValidVerificationMethod(vm)).toBe(true);
        }
      });
  });

  it('5.4 Services - The service property is OPTIONAL. If present, the ' +
    'associated value MUST be an ordered set of services, where each service ' +
    'is described by a map.', async () => {
      const {service} = didDocument;
      if(service) {
        expect(Array.isArray(service)).toBe(true);
        service.forEach(serviceValue => {
          expect(serviceValue).toBeInfraMap();
        });
      }
  });

  it('5.4 Services - Each service map MUST contain id, type, and ' +
    'serviceEndpoint properties.', async () => {
      const {service} = didDocument;
      if(service) {
        service.forEach(serviceValue => {
          expect(serviceValue).toHaveProperty('id');
          expect(serviceValue).toHaveProperty('type');
          expect(serviceValue).toHaveProperty('serviceEndpoint');
        });
      }
  });

  it('5.4 Services - The value of the id property MUST be a URI ' +
    'conforming to [RFC3986].', async () => {
      const {service} = didDocument;
      if(service) {
        service.forEach(serviceValue => {
          expect(serviceValue.id).toBeValidUri();
        });
      }
  });

  it('5.4 Services - A conforming producer MUST NOT produce multiple ' +
    'service entries with the same id.', async () => {
      const {service} = didDocument;
      const allIds = [];
      if(service) {
        service.forEach(serviceValue => {
          allIds.push(serviceValue.id);
        });
        const allUniqueIds = new Set(allIds);
        expect(allUniqueIds.size === allIds.length).toBe(true);
      }
  });

  it('5.4 Services - A conforming consumer MUST produce an error if it ' +
    'detects multiple service entries with the same id.', async () => {
      const {service} = didDocument;
      const allIds = [];
      if(service) {
        // Implementation #1
        service.forEach(serviceValue => {
          allIds.push(serviceValue.id);
        });
        const allUniqueIds = new Set(allIds);
        expect(allUniqueIds.size === allIds.length).toBe(true);

        // TODO: Implementation #2
      }
  });

  it('5.4 Services - The value of the type property MUST be a string or ' +
    'an ordered set of strings.', async () => {
      const {service} = didDocument;
      if(service) {
        service.forEach(serviceValue => {
          if(typeof serviceValue.type === 'string') {
            expect(serviceValue.type.length > 0).toBe(true);
          } else if(Array.isArray(serviceValue.type)) {
            const types = serviceValue.type;
            types.forEach(type => {
              expect(type).toBeInfraString();
            });
          } else {
            throw new Error('Invalid value for `type` property.');
          }
        });
      }
  });

  it('5.4 Services - The value of the serviceEndpoint property MUST be ' +
    'a string, a map, or an ordered set composed of one or more strings ' +
    'and/or maps.', async () => {
      const {service} = didDocument;
      if(service) {
        service.forEach(serviceValue => {
          const {serviceEndpoint} = serviceValue;
          if(typeof serviceEndpoint === 'string') {
            expect(serviceEndpoint.length > 0).toBe(true);
          } else if(typeof serviceEndpoint === 'object') {
            expect(Object.entries(serviceEndpoint).length > 0).toBe(true);
          } else if(Array.isArray(serviceEndpoint)) {
            serviceEndpoint.forEach(endpointValue => {
              if(typeof endpointValue === 'string') {
                expect(endpointValue.length > 0).toBe(true);
              } else if(typeof endpointValue === 'object') {
                expect(Object.entries(endpointValue).length > 0).toBe(true);
              }
            });
          } else {
            throw new Error(
              'Unknown value for serviceEndpoint: ' + serviceEndpoint);
          }
        });
      }
  });

  it('5.4 Services - All [serviceEndpoint] string values MUST be valid ' +
    'URIs conforming to [RFC3986] and normalized according to the ' +
    'Normalization and Comparison rules in RFC3986 and to any normalization ' +
    'rules in its applicable URI scheme specification.', async () => {
      const {service} = didDocument;
      if(service) {
        service.forEach(serviceValue => {
          const {serviceEndpoint} = serviceValue;
          if(typeof serviceEndpoint === 'string') {
            expect(serviceEndpoint).toBeValidUri();
          }
        });
      }
  });
}

const getAllVerificationMethods = (didDocument) => {
  const verificationMethods = [];
  const verificationRelationships = ['verificationMethod', 'authentication',
    'assertionMethod', 'keyAgreement', 'capabilityInvocation',
    'capabilityDelegation'];
  verificationRelationships.forEach(name => {
    didDocument[name]?.forEach(vr => {
      if(typeof vr === 'object') {
        verificationMethods.push(vr);
      }
    });
  })

  return verificationMethods;
};

const didCorePropertiesTests = (suiteConfig) => {
  suiteConfig.dids.forEach((did) => {
    describe(did, () => {
      for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
        if(jsonMediaTypes.includes(mediaType)) {
          const {didDocumentDataModel} = suiteConfig[did];
          didDocumentDataModel.representationSpecificEntries =
            resolutionResult.didDocumentDataModel.representationSpecificEntries;
          describe(mediaType, () => {
            generateDidCorePropertiesTests(
              {did, didDocumentDataModel, resolutionResult});
          });
        }
      }
    });
  });
};

module.exports = { didCorePropertiesTests };
