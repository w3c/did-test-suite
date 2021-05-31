const getReportResults = require("../services/getReportResults");

const suitesInput = require("../__fixtures__/suitesInput.json");
const suitesOutput = require("../__fixtures__/suitesOutput.json");

const registerRoutes = (server) => {
  server.get(
    "/",
    {
      schema: {
        hide: true,
      },
    },
    (req, reply) => {
      reply.redirect("/api/docs");
    }
  );
  server.post(
    "/test-suite-manager/generate-report",
    {
      schema: {
        tags: ["Test Suite Manager"],
        summary: "Generate Report",
        description: "Run tests on supplied suites",
        body: {
          type: "object",
          example: suitesInput,
          additionalProperties: true,
        },
        response: {
          200: {
            description: "Success",
            type: "object",
            example: suitesOutput,
            additionalProperties: true,
          },
        },
      },
    },
    async (req, reply) => {
      try {
        response = await getReportResults(req.body);
        reply.send(response);
      } catch (e) {
        reply.status(500).send({ error: e.message });
      }
    }
  );
};

module.exports = { registerRoutes };
