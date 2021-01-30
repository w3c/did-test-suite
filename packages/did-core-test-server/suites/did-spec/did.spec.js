let { suiteConfig } = global;

const { runSuite } = require('./run-suite');

if (!suiteConfig) {
  suiteConfig = require('./defaultSuiteConfig.json');
}

runSuite(suiteConfig);
