export default expected => {
    const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/
    return regex.test(expected)
};

