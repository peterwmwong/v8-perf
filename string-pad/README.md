## Benchmark: `bench.js`

```js
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

```

## Results

|        |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| --noopt | padStart(maxLength, string) | 5497.30ms | 2267.35ms | 2.42x |
| --noopt | padEnd(maxLength, string) | 5503.10ms | 2266.55ms | 2.43x |
| --noopt | padStart(maxLength) | 6515.60ms | 3048.55ms | 2.14x |
| --noopt | padEnd(maxLength) | 6482.80ms | 3088.35ms | 2.10x |
|  | padStart(maxLength, string) | 1199.80ms | 791.30ms | 1.52x |
|  | padEnd(maxLength, string) | 1185.35ms | 785.40ms | 1.51x |
|  | padStart(maxLength) | 1050.25ms | 1031.20ms | 1.02x |
|  | padEnd(maxLength) | 1051.65ms | 1037.00ms | 1.01x |
