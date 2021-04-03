let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default');
}

describe('6.x Consumption', () => {
  require('./did-consumer').didConsumerTests(suiteConfig);
});
