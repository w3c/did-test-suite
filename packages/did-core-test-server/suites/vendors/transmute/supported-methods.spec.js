let { suiteConfig } = global;

const { runSuite } = require('../../did-spec/run-suite');

if (!suiteConfig) {
  suiteConfig = require('./suite-config.js');
}

runSuite(suiteConfig);
