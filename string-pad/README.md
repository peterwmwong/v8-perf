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
| --noopt | padStart(maxLength, string) | 5453.35ms | 2218.30ms | 2.46x |
| --noopt | padEnd(maxLength, string) | 5441.15ms | 2223.35ms | 2.45x |
| --noopt | padStart(maxLength) | 6491.10ms | 3003.15ms | 2.16x |
| --noopt | padEnd(maxLength) | 6478.25ms | 3004.90ms | 2.16x |
|  | padStart(maxLength, string) | 1208.65ms | 773.55ms | 1.56x |
|  | padEnd(maxLength, string) | 1200.50ms | 768.80ms | 1.56x |
|  | padStart(maxLength) | 1053.95ms | 1027.50ms | 1.03x |
|  | padEnd(maxLength) | 1062.15ms | 1025.00ms | 1.04x |
