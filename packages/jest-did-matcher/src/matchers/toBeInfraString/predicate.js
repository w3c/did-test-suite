export default expected => {
    // Same as toBeString
    return typeof expected === 'string' || expected instanceof String;
};
