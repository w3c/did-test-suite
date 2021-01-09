const fastifySwagger = require('fastify-swagger');

const registerSwagger = (server) => {
  server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'DID Core Test Server',
        description: 'DID Core Test Conformance.',
        version: '0.0.0',
        license: {
          name: 'DID Core Specification',
          url: 'https://github.com/w3c/did-core',
        },
        contact: {
          name: 'GitHub Source Code',
          url: 'https://github.com/w3c/did-test-suite',
        },
      },

      basePath: '',
    },
    routePrefix: 'api/docs',
    exposeRoute: true,
  });
};

module.exports = { registerSwagger };
