export default expected => {
    let valid = false;
    try {
        new URL(expected);
        valid = true;
    } catch (error) {}
    return valid;
};

