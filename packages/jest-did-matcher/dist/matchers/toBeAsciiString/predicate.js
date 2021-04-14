'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = expected => {
    if (!(typeof expected === 'string' || expected instanceof String)) {
        return false;
    }
    return (/^[\x00-\x7F]*$/.test(expected)
    );
};