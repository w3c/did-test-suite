'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = expected => {
    // Same as toBeString
    return typeof expected === 'string' || expected instanceof String;
};