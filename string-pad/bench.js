'use strict';

const STRINGS = Array.from({ length: 32 }, (_, i) => "a".repeat(i));
const PADDINGS = Array.from({ length: 16 }, (_, i) => "-".repeat(i));

const VARIANTS = {
  'padStart-maxLength-string': (string, maxLength, padString) =>
    string.padStart(maxLength, padString),
  'padEnd-maxLength-string': (string, maxLength, padString) =>
    string.padEnd(maxLength, padString),
  'padStart-maxLength': (string, maxLength) =>
    string.padStart(maxLength),
  'padEnd-maxLength': (string, maxLength) =>
    string.padEnd(maxLength)
};

const func = VARIANTS[arguments[0]];
if (func === undefined) throw new Error(`Unknown variant ${arguments[0]}, expected ${Object.keys(VARIANTS).join(', ')}`);

function test() {
  let result = 0;
  for (const string of STRINGS) {
    for (const padString of PADDINGS) {
      for (let maxLength = string.length; maxLength < string.length + 32; maxLength++) {
        result += func(string, maxLength, padString).length;
      }
    }
  }
  return result;
}

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) test();
}

const start = Date.now();
bench(1e3);
console.log(Date.now() - start);
