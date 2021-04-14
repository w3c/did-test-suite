'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jestMatcherUtils = require('jest-matcher-utils');

var _predicate = require('./predicate');

var _predicate2 = _interopRequireDefault(_predicate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passMessage = received => () => (0, _jestMatcherUtils.matcherHint)('.not.toBeAsciiString', 'received', '') + '\n\n' + 'Expected value to not be of type INFRA string received:\n' + `  ${(0, _jestMatcherUtils.printReceived)(received)}`;

const failMessage = received => () => (0, _jestMatcherUtils.matcherHint)('.toBeAsciiString', 'received', '') + '\n\n' + 'Expected value to be of type INFRA string:\n' + `  ${(0, _jestMatcherUtils.printExpected)('type of INFRA string')}` + 'Received:\n' + `  ${(0, _jestMatcherUtils.printReceived)(received)}`;

exports.default = {
    toBeAsciiString: expected => {
        const pass = (0, _predicate2.default)(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isAsciiString: obj => {
        return (0, _predicate2.default)(obj);
    }
};