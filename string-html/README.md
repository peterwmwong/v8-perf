## Benchmark: `bench.js`

```js
'use strict';

const STRINGS = [
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "Ut",
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "Ut"
];

const randomString = () => STRINGS[(Math.random() * STRINGS.length) | 0];

const htmlFuncName = arguments[0];
const needsArg = [
  'anchor',
  'fontcolor',
  'fontsize',
  'link'
].includes(htmlFuncName);

function bench(){
  let result = 0;
  for (let x = 0; x < 1e4; x++) {
    for (let i = 0; i < STRINGS.length; i++) {
      const str = STRINGS[i];
      if (needsArg) {
        result += str[htmlFuncName]().length;
      }
      else {
        result += str[htmlFuncName](randomString()).length;
      }
    }
  }
  return result;
}

const start = Date.now();
bench();
console.log(Date.now() - start);

```

## Results

|        | Method | Before | After | Improvement |
|--------|--------|--------|-------|-------------|
| --noopt | big | 99.60ms | 89.60ms | 1.11x |
| --noopt | blink | 101.30ms | 89.10ms | 1.14x |
| --noopt | bold | 100.10ms | 91.30ms | 1.10x |
| --noopt | fixed | 101.50ms | 92.40ms | 1.10x |
| --noopt | italics | 101.10ms | 90.30ms | 1.12x |
| --noopt | small | 100.10ms | 88.00ms | 1.14x |
| --noopt | strike | 97.90ms | 85.70ms | 1.14x |
| --noopt | sub | 98.30ms | 88.70ms | 1.11x |
| --noopt | sup | 99.20ms | 89.00ms | 1.11x |
| --noopt | anchor | 151.20ms | 152.90ms | 0.99x |
| --noopt | fontcolor | 146.40ms | 149.30ms | 0.98x |
| --noopt | fontsize | 148.70ms | 151.40ms | 0.98x |
| --noopt | link | 146.40ms | 152.20ms | 0.96x |
|  | big | 47.60ms | 45.20ms | 1.05x |
|  | blink | 44.90ms | 43.70ms | 1.03x |
|  | bold | 47.70ms | 46.70ms | 1.02x |
|  | fixed | 46.10ms | 45.70ms | 1.01x |
|  | italics | 47.10ms | 46.40ms | 1.02x |
|  | small | 45.20ms | 46.90ms | 0.96x |
|  | strike | 45.40ms | 44.80ms | 1.01x |
|  | sub | 47.10ms | 44.00ms | 1.07x |
|  | sup | 44.90ms | 44.80ms | 1.00x |
|  | anchor | 101.50ms | 130.80ms | 0.78x |
|  | fontcolor | 101.00ms | 130.50ms | 0.77x |
|  | fontsize | 104.80ms | 129.20ms | 0.81x |
|  | link | 101.90ms | 129.40ms | 0.79x |
