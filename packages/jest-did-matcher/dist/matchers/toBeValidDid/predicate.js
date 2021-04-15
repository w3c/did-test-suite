"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = expected => {
    const didRegex = /^did:(?<method>[a-z0-9]+):(?<idchar>([a-zA-Z0-9.\-_]|%[0-9a-fA-F]{2})+$)/;
    return didRegex.test(expected);
};