// (DID document) property value MUST be a string, map, list, ordered set, boolean, or null.
export default expected => {
    if (expected === null) {
        return true;
    }

    if (Array.isArray(expected)) { // list
        return true;
    }

    if (expected instanceof Map || expected instanceof Set) {
        return true;
    }

    switch (typeof expected) {
        case 'object': // map and ordered set
        case 'boolean':
        case 'string':
            return true;
    }

    if (expected instanceof String) {
        return true;
    }

    return false;
};
