'use strict';

var _matchers = require('./matchers');

var _matchers2 = _interopRequireDefault(_matchers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jestExpect = global.expect;

if (jestExpect !== undefined) {
  jestExpect.extend(_matchers2.default);
} else {
  /* eslint-disable no-console */
  console.error("Unable to find Jest's global expect." + '\nPlease check you have added jest-did-matcher correctly to your jest configuration.');
  /* eslint-enable no-console */
}