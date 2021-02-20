function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function toFixedNumber(nb, digits, base=10) {
    var pow = Math.pow(base||10, digits);
    return Math.round(nb*pow) / pow;
}

export {sleep, toFixedNumber};