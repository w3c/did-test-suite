"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = expected => {
    const pchar = "[a-zA-Z-\\._~]|%[0-9a-fA-F][0-9a-fA-F]|[!$&'()*+,;=:@]";
    const didUrl = "^" + "did:" + "([a-z0-9]+)" + // method_name
    "(:" + // method-specific-id
    "([a-zA-Z0-9\\.\\-_]|%[0-9a-fA-F]{2})+" + ")+" + "(/(" + pchar + ")*)?"; // + // path-abempty
    "(\\?(" + pchar + "|/|\\?)+)?" + // [ "?" query ]
    "(#(" + pchar + "|/|\\?)+)?"; // [ "#" fragment ]
    "$";
    return new RegExp(didUrl).test(expected);
};