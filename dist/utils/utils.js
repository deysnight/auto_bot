"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;
exports.toFixedNumber = toFixedNumber;
exports.randomInt = randomInt;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toFixedNumber(nb, digits) {
  var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var pow = Math.pow(base || 10, digits);
  return Math.round(nb * pow) / pow;
} //[binf, bsup[


function randomInt(binf, bsup) {
  return Math.floor(Math.random() * Math.floor(bsup + binf)) + binf;
}