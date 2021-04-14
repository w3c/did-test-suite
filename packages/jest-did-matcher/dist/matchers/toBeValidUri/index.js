'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jestMatcherUtils = require('jest-matcher-utils');

var _predicate = require('./predicate');

var _predicate2 = _interopRequireDefault(_predicate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passMessage = received => () => (0, _jestMatcherUtils.matcherHint)('.not.toBeValidUri', 'received', '') + '\n\n' + 'Expected value to not be of a valid Uri received:\n' + `  ${(0, _jestMatcherUtils.printReceived)(received)}`;

const failMessage = received => () => (0, _jestMatcherUtils.matcherHint)('.toBeValidUri', 'received', '') + '\n\n' + 'Expected value to be of a valid Uri:\n' + `  ${(0, _jestMatcherUtils.printExpected)('a valid Uri')}` + 'Received:\n' + `  ${(0, _jestMatcherUtils.printReceived)(received)}`;

exports.default = {
    toBeValidUri: expected => {
        const pass = (0, _predicate2.default)(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isValidUri: obj => {
        return (0, _predicate2.default)(obj);
    }
};