const didKey = require('./did-key/did-key');
const didWeb = require('./did-web');

const resolutionObjects = {
  ...didKey,
  ...didWeb,
};

module.exports = {
  name: 'did-spec',
  vendors: {
    transmute: {
      didMethods: {
        'did:key': {
          supportedContentTypes: [
            'application/did+ld+json',
            'application/did+json',
          ],
          dids: Object.keys(resolutionObjects),
          ...resolutionObjects,
        },
      },
    },
  },
};
