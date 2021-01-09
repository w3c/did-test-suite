const fastifySwagger = require("fastify-swagger");

const registerSwagger = (server) => {
  server.register(fastifySwagger, {
    swagger: {
      info: {
        title: "VC HTTP API Test Server",
        description: "HTTP API for VC HTTP API Conformance.",
        version: "0.0.0",
        license: {
          name: "W3C CCG Specification",
          url: "https://w3c-ccg.github.io/vc-http-api/",
        },
        contact: {
          name: "GitHub Source Code",
          url: "https://github.com/w3c-ccg/vc-http-api",
        },
      },

      basePath: "",
    },
    routePrefix: "api/docs",
    exposeRoute: true,
  });
};

module.exports = { registerSwagger };
