const { test_all } = require('../services/test-all');
const { test_scenario } = require('../services/test-scenario');

const registerRoutes = (server) => {
  server.get(
    '/',
    {
      schema: {
        tags: ['Optional'],
      },
    },
    (_req, reply) => {
      reply.send({
        message: 'Welcome to the DID Core Test Server',
      });
    }
  );

  server.post(
    '/test',
    {
      schema: {
        tags: ['Optional'],
      },
    },
    (req, reply) => {
      try {
        const response = test_all(req.body);
        reply.send(response);
      } catch (e) {
        reply.status(500).send({ error: e.message });
      }
    }
  );

  server.post(
    '/test/scenarios',
    {
      schema: {
        tags: ['Optional'],
      },
    },
    (req, reply) => {
      try {
        const response = test_scenario(req.body);
        reply.send(response);
      } catch (e) {
        if (e.message === 'No test for scenario') {
          return reply
            .status(400)
            .send({ scenario: req.body.name, error: e.message });
        }
        reply.status(500).send({ error: e.message });
      }
    }
  );
};

module.exports = { registerRoutes };
