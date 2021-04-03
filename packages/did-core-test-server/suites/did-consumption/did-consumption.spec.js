let { suiteConfig } = global;

if (!suiteConfig) {
  suiteConfig = require('./default');
}

describe('did-consumption', () => {
  require('./did-consumer').didConsumerTests(suiteConfig);
});
