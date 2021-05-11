export default expected => {
    const regex = /[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9]Z/
    return regex.test(expected)
};
