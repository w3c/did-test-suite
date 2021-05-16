export default expected => {
    const regex = /[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9]Z/;
    let valid = regex.test(expected);
    if (valid) {
        let milliseconds = Date.parse(expected);
        if (isNaN(milliseconds)) {
            valid = false;
        }
        else {
            // convert unix_time to ISO8601 string without sub-seconds.
            let d = new Date(milliseconds);
            let iso_date = d.toISOString();
            let did_date = iso_date.replace('.000Z', 'Z'); // should be zero
            valid = did_date == expected;
        }
    }
    return valid;
};
