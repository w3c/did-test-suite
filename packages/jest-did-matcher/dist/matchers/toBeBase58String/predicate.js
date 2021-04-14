'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = expected => {
    const base58Regex = /^[a-km-zA-HJ-NP-Z1-9]+$/;
    if (!(typeof expected === 'string' || expected instanceof String)) {
        return false;
    }
    return base58Regex.test(expected);
};