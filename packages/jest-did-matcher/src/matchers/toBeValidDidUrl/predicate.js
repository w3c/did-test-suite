export default expected => {
    const pchar = "[a-zA-Z0-9\\-\\._~]|%[0-9a-fA-F]{2}|[!$&'()*+,;=:@]";
    const didUrl =
        "^" +
        "did:" +
        "([a-z0-9]+)" + // method_name
        "(:" + // method-specific-id
            "([a-zA-Z0-9\\.\\-_]|%[0-9a-fA-F]{2})+" +
        ")+" +
        "((/(" + pchar + ")+)+)?" + // path-abempty
        "(\\?(" + pchar + "|/|\\?)+)?" + // [ "?" query ]
        "(#(" + pchar + "|/|\\?)+)?" + // [ "#" fragment ]
        "$"
        ;
    return new RegExp(didUrl).test(expected);
};
