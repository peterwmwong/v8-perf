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
  "abcdefghij"
];

function test() {
  let result = 0;
  for (const string of STRINGS) {
    for (let i = 0; i < 50; i++) {
      result += string.repeat(i).length;
    }
  }
  return result;
}

function bench(){
  for (let iter = 0; iter < 1e4; iter++) {
    test();
  }
}

const start = Date.now();
bench();
console.log(Date.now() - start);

```

## Results

| Before | After | Improvement |
|--------|-------|-------------|
| 303.65ms | 246.47ms | 1.23x |
