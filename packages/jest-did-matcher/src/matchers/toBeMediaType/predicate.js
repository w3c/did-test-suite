export default expected => {
    const regex = /^\w+\/[-+.\w]+/
    return regex.test(expected)
};

