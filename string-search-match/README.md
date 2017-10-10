## Benchmark: `bench.js`

```js
'use strict';

const STRINGS = [
  "a",
  "ab",
  "abc",
  "abcd",
  "abcde",
  "abcdef",
  "abcdefg",
  "abcdefgh",
  "abcdefghi",
  "abcdefghij",
  "abcdefghijk",
  "abcdefghijkl",
  "abcdefghijklm",
  "abcdefghijklmn",
  "abcdefghijklmno",
  "abcdefghijklmnop",
  "abcdefghijklmnopq"
];

const PATTERN_STRINGS = [
  "a",
  "b",
  "c",
  "bc",
  "cd",
  "d.*",
  "e.*",
  "d.*(fgh|ghi|hijijk)$"
];

const PATTERN_REGEXES = [
  /a/,
  /b/,
  /c/,
  /bc/,
  /cd/,
  /d.*/,
  /e.*/,
  /d.*(fgh|ghi|hijijk)$/
];

const func = (funcName => {
  switch (funcName) {
    case 'match':
      return (string, pattern) => {
        const result = string.match(pattern);
        return result === null ? 0 : result[0].length;
      };
    case 'search':
      return (string, pattern) => string.search(pattern);
    default:
      throw new Error(`Unknown function ${funcName}, expected 'match' or 'search'`);
  }
})(arguments[0]);

const patterns = (mode => {
  switch (mode) {
    case 'string': return PATTERN_STRINGS;
    case 'regex': return PATTERN_REGEXES;
    case 'both': return [...PATTERN_STRINGS, ...PATTERN_REGEXES];
    default: throw new Error(`Unknown mode ${mode}, expected 'string', 'regex', or 'both'`);
  }
})(arguments[1]);

function test() {
  let result = 0;
  for (const string of STRINGS) {
    for (const pattern of patterns) {
      result += func(string, pattern);
    }
  }
  return result;
}

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    test();
  }
}

// Warmup
bench(2);

// Bench
const start = Date.now();
bench(1e5);
console.log(Date.now() - start);

```

## Results

|        |  Method  | Pattern | Before | After | Improvement |
|--------|----------|---------|--------|-------|-------------|
| --noopt | search | string | 4690.90ms | 3532.20ms | 1.33x |
| --noopt | search | regex | 2597.10ms | 2080.40ms | 1.25x |
| --noopt | search | both | 7228.80ms | 5515.10ms | 1.31x |
| --noopt | match | string | 5207.20ms | 3938.10ms | 1.32x |
| --noopt | match | regex | 2964.10ms | 2458.00ms | 1.21x |
| --noopt | match | both | 8136.30ms | 6373.60ms | 1.28x |
|  | search | string | 2218.50ms | 1892.10ms | 1.17x |
|  | search | regex | 520.90ms | 503.70ms | 1.03x |
|  | search | both | 2826.20ms | 2420.50ms | 1.17x |
|  | match | string | 2501.90ms | 2109.90ms | 1.19x |
|  | match | regex | 724.90ms | 688.20ms | 1.05x |
|  | match | both | 3263.30ms | 2844.60ms | 1.15x |
