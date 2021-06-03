export default expected => {
    const didRegex = /^did:(?<method_name>[a-z0-9]+):(?<method_specific_id>([a-zA-Z0-9.\-_]|%[0-9a-fA-F]{2}|:)+[^:]$)/;
    return didRegex.test(expected);
};
