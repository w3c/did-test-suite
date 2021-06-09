export default expected => {
    const didRegex1 = /^did:(?<method_name>[a-z0-9]+):(?<method_specific_id>([a-zA-Z0-9.\-_]|%[0-9a-fA-F]{2}|:)+$)/;
    const didRegex2 = /:$/;
    return didRegex1.test(expected) && !didRegex2.test(expected);
};
