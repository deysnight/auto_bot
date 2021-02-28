function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function toFixedNumber(nb, digits, base=10) {
    var pow = Math.pow(base||10, digits);
    return Math.round(nb*pow) / pow;
}

//[binf, bsup[
function randomInt(binf, bsup)
{
    return (Math.floor(Math.random() * Math.floor(bsup + binf))) + binf
}

export {sleep, toFixedNumber, randomInt};