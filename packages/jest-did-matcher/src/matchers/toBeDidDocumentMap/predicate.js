// (DID document) property value MUST be a string, map, list, ordered set, boolean, or null.

export function predicate(expected) {
    if (expected === null) {
        return true;
    }

    if (Array.isArray(expected)) {
        return expected.map(element => predicate(element)).reduce( (p, c) => (p && c), true);
    }

    if (expected instanceof Map || expected instanceof Set) {
        let r = true;
        expected.forEach(v => { r = r && predicate(v); });
        return r;
    }

    if (typeof expected == "object") {
        return Object.keys(expected).map(key => predicate(expected[key])).reduce( (p, c) => (p && c), true);
    }

    switch (typeof expected) {
        case 'boolean':
        case 'string':
            return true;
    }

    if (expected instanceof String) {
        return true;
    }

    return false;
}
