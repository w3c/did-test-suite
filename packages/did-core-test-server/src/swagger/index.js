const fastifySwagger = require('fastify-swagger');

const registerSwagger = (server) => {
  server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'DID Core Test Server',
        description: 'HTTP API for Testing DID Core Conformance.',
        version: '0.0.0',
        license: {
          name: 'W3C Specification',
          url: 'https://www.w3.org/TR/did-core/',
        },
        contact: {
          name: 'GitHub Source Code',
          url: 'https://github.com/w3c/did-core',
        },
      },

      basePath: '',
    },
    routePrefix: 'api/docs',
    exposeRoute: true,
  });
};

module.exports = { registerSwagger };
