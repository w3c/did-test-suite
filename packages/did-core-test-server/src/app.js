const fastify = require('fastify');
const { registerSwagger } = require('./swagger');
const { registerRoutes } = require('./routes');

const opts = {
  ignoreTrailingSlash: true,
};

const app = fastify(opts);

registerSwagger(app);
registerRoutes(app);

app.register(require('fastify-cors'));

module.exports = { app };
