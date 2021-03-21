const utils = require('./utils');
const {isValidDID, isValidURI, isValidBase58, isValidJwk} = utils;
const jose = require('node-jose');

const jsonMediaTypes = ['application/did+ld+json', 'application/did+json'];

const generateDidCorePropertiesTests = ({did, resolutionResult}) => {
  const {didDocument} = resolutionResult;

  it('5.1.1 DID Subject - The value of id MUST be a string that ' +
    'conforms to the rules in § 3.1 DID Syntax and MUST exist in the root ' +
    'map of the data model for the DID document.', async () => {
      expect(didDocument).toHaveProperty('id');
      expect(isValidDID(didDocument.id)).toBe(true);
  });

  it('5.1.2 DID Controller - The controller property is OPTIONAL. If ' +
    'present, the value MUST be a string or an ordered set of strings that ' +
    'conform to the rules in § 3.1 DID Syntax.', async () => {
      const {controller} = didDocument;
      if(controller) {
        const controllers =
          (Array.isArray(controller)) ? controller : [controller];
        controllers.forEach(didController => {
          expect(isValidDID(didController)).toBe(true);
        });
      }
  });

  it('5.1.3 Also Known As - The alsoKnownAs property is OPTIONAL. If ' +
    'present, the value MUST be an ordered set where each item in the set ' +
    'is a URI conforming to [RFC3986].', async () => {
      const {alsoKnownAs} = didDocument;
      if(alsoKnownAs) {
        expect(Array.isArray(alsoKnownAs)).toBe(true);
        alsoKnownAs.forEach(alsoKnownAsValue => {
          expect(isValidURI(alsoKnownAsValue)).toBe(true);
        });
      }
  });

  it('5.2 Verification Methods - The verificationMethod property is ' +
    'OPTIONAL. If present, the value MUST be an ordered set of verification ' +
    'methods, where each verification method is expressed using a map.',
    async () => {
      const {verificationMethod} = didDocument;
      if(verificationMethod) {
        expect(Array.isArray(verificationMethod)).toBe(true);
        verificationMethod.forEach(verificationMethodValue => {
          expect(isValidURI(verificationMethodValue)).toBe(true);
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
        expect(isValidDID(vm.id)).toBe(true);
      });
  });

  it('5.2 Verification Methods - The value of the type property MUST be ' +
    'a string that references exactly one verification method type.',
    async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        expect(typeof vm.type === 'string').toBe(true);
      });
  });

  it('5.2 Verification Methods - The value of the controller property ' +
    'MUST be a string that conforms to the rules in § 3.1 DID Syntax.',
    async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        expect(isValidDID(vm.controller)).toBe(true);
      });
  });

  it('5.2 Verification Methods - The publicKeyBase58 property is ' +
    'OPTIONAL. This feature is non-normative. If present, the value MUST be a' +
    'string representation of a [BASE58] encoded public key.', async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        const {publicKeyBase58} = vm;
        if(publicKeyBase58) {
          expect(isValidBase58(publicKeyBase58)).toBe(true);
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
    'using both publicKeyJwk and publicKeyBase58 at the same time is ' +
    'prohibited.',
    async () => {
      const verificationMethods = getAllVerificationMethods(didDocument);
      verificationMethods.forEach(vm => {
        const {publicKeyBase58} = vm;
        const {publicKeyJwk} = vm;
        if(publicKeyBase58 !== undefined && publicKeyJwk !== undefined) {
          throw new Error('Both publicKeyJwk and publicKeyBase58 are ' +
            'defined at the same time.');
        }
      });
  });

  it.skip('5.3.1 Authentication - The authentication property is OPTIONAL. ' +
    'If present, the associated value MUST be an ordered set of one or more ' +
    'verification methods.', async () => {

  });

  it.skip('5.3.2 Assertion - The assertionMethod property is OPTIONAL. If ' +
    'present, the associated value MUST be an ordered set of one or more ' +
    'verification methods.', async () => {

  });

  it.skip('5.3.3 Key Agreement - The keyAgreement property is OPTIONAL. If ' +
    'present, the associated value MUST be an ordered set of one or more ' +
    'verification methods.', async () => {

  });

  it.skip('5.3.4 Capability Invocation - The capabilityInvocation property ' +
    'is OPTIONAL. If present, the associated value MUST be an ordered set of ' +
    'one or more verification methods.', async () => {

  });

  it.skip('5.3.5 Capability Delegation - The capabilityDelegation property ' +
    'is OPTIONAL. If present, the associated value MUST be an ordered set of ' +
    'one or more verification methods.', async () => {

  });

  it.skip('5.4 Services - The service property is OPTIONAL. If present, the ' +
    'associated value MUST be an ordered set of services, where each service ' +
    'is described by a map.', async () => {

  });

  it.skip('5.4 Services - Each service map MUST contain id, type, and ' +
    'serviceEndpoint properties.', async () => {

  });

  it.skip('5.4 Services - The value of the id property MUST be a URI ' +
    'conforming to [RFC3986].', async () => {

  });

  it.skip('5.4 Services - A conforming producer MUST NOT produce multiple ' +
    'service entries with the same id.', async () => {

  });

  it.skip('5.4 Services - A conforming consumer MUST produce an error if it ' +
    'detects multiple service entries with the same id.', async () => {

  });

  it.skip('5.4 Services - The value of the type property MUST be a string or ' +
    'an ordered set of strings.', async () => {

  });

  it.skip('5.4 Services - The value of the serviceEndpoint property MUST be ' +
    'a string, a map, or an ordered set composed of one or more strings ' +
    'and/or maps.', async () => {

  });

  it.skip('5.4 Services - All [serviceEndpoint] string values MUST be valid ' +
    'URIs conforming to [RFC3986] and normalized according to the ' +
    'Normalization and Comparison rules in RFC3986 and to any normalization ' +
    'rules in its applicable URI scheme specification.', async () => {

  });
}

const getAllVerificationMethods = (didDocument) => {
  const verificationMethods = [];
  const verificationRelationships = ['verificationMethod', 'authentication',
    'assertionMethod', 'keyAgreement', 'capabilityInvocation',
    'capabilityDelegation'];
  verificationRelationships.forEach(name => {
    didDocument[name].forEach(vr => {
      if(typeof vr === 'object') {
        verificationMethods.push(vr);
      }
    });
  })

  return verificationMethods;
};

const didCorePropertiesTests = (suiteConfig) => {
  describe('did-core-properties', () => {
    suiteConfig.dids.forEach((did) => {
      describe(did, () => {
        for(const [mediaType, resolutionResult] of Object.entries(suiteConfig[did])) {
          if(jsonMediaTypes.includes(mediaType)) {
            generateDidCorePropertiesTests({did, resolutionResult});
          }
        }
      });
    });
  });
};

module.exports = { didCorePropertiesTests };
