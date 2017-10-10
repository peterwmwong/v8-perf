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

const MATCH_SYMBOL = Symbol.match;
const SEARCH_SYMBOL = Symbol.search;

const func = (funcName => {
  switch (funcName) {
    case 'match':
      return (pattern, string) => {
        const result = pattern[MATCH_SYMBOL](string);
        return result === null ? 0 : result[0].length;
      };
    case 'search':
      return (pattern, string) => pattern[SEARCH_SYMBOL](string);
    default:
      throw new Error(`Unknown function ${funcName}, expected 'match' or 'search'`);
  }
})(arguments[0]);

const patterns = PATTERN_REGEXES;

function test() {
  let result = 0;
  for (const string of STRINGS) {
    for (const pattern of patterns) {
      result += func(pattern, string);
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

|        |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| --noopt | search | 2137.50ms | 2119.90ms | 1.01x |
| --noopt | match | 2482.90ms | 2515.70ms | 0.99x |
|  | search | 470.20ms | 499.60ms | 0.94x |
|  | match | 674.30ms | 696.50ms | 0.97x |
