module.exports = (number) => {
    const nNumber = number.replace(/\D/g, '');
    let split = nNumber.split('');
    split = split.map((num) => parseInt(num, 10));
    const check = split.pop();
    split.reverse();
    split = split.map((num, index) => {
        let def = num;
        if (index % 2 === 0) {
            def *= 2;
            if (def > 9) {
                def -= 9;
            }
        }
        return def;
    });
    const sum = split.reduce((prev, curr) => prev + curr);
    return (sum % 10 === check);
};
