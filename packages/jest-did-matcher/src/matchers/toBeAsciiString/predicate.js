export default expected => {
    if (! (typeof expected === 'string' || expected instanceof String) ) {
        return false;
    }
    return /^[\x00-\x7F]*$/.test(expected);
};
