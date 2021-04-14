export default expected => {
    // URI Regex is from RFC3986 Appendix B
    const uriRegex =
    /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

    if (! (typeof expected === 'string' || expected instanceof String) ) {
        return false;
    }
    if (expected == "") {
        return false;
    }
    return uriRegex.test(expected);
};

