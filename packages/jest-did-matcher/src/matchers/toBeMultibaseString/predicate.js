export default expected => {
    const multibaseRegex = /^[079fFvVtTbBcChkKzZmMuUp].+$/;
    if (! (typeof expected === 'string' || expected instanceof String) ) {
        return false;
    }
    return multibaseRegex.test(expected);
};
