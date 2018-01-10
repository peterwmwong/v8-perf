## Benchmark: `bench.js`

```js
'use strict';

const ITERATIONS = 1e4;
const VARIANT_NAME = arguments[1];
const LENGTH = arguments[0];
const HALF_LENGTH = (LENGTH / 2) | 0;
const QUARTER_LENGTH = (LENGTH / 4) | 0;

/*
0, 1, 2, ..., 127, 0, 1, 2, ...
*/
const createBuffer = length => {
  const buf = new ArrayBuffer(length);
  new Int8Array(buf).set(Array.from({ length }, (_, i) => i % 128));
  return buf;
};
const ARRAY_BUFFER = createBuffer(LENGTH);

const VARIANTS = {
  /*
  0 1 2 3
  0   1   2   3
  */
  leftOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, 0, HALF_LENGTH),
    target: new Int16Array(ARRAY_BUFFER, 0, HALF_LENGTH)
  }),

  /*
          4 5 6 7
  0   1   2   3
  */
  rightOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, HALF_LENGTH, HALF_LENGTH),
    target: new Int16Array(ARRAY_BUFFER, 0, HALF_LENGTH)
  }),

  /*
      2 3 4 5
  0   1   2   3
  */
  midOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, QUARTER_LENGTH, HALF_LENGTH),
    target: new Int16Array(ARRAY_BUFFER, 0, HALF_LENGTH)
  }),

 nonOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, 0, HALF_LENGTH),
    target: new Int16Array(createBuffer(LENGTH))
  })
};

const variant = VARIANTS[VARIANT_NAME];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

// const debug = func => {
//   const { target, source } = func(createBuffer(LENGTH));
//   console.log(`${func.name}`);
//   console.log('before:', source, target);
//   target.set(source);
//   console.log('after:', source, target);
// }
// debug(variant);

const { source, target } = variant();
const start = performance.now();
for (let iter = 0; iter < ITERATIONS; iter++) {
  target.set(source);
}
console.log(performance.now() - start);

```

## Results

|  Size  |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| 256 | left overlap | 10.38ms | 2.36ms | 4.40x |
| 256 | right overlap | 10.22ms | 2.35ms | 4.35x |
| 256 | middle overlap | 10.39ms | 2.36ms | 4.40x |
| 256 | no overlap | 2.01ms | 1.84ms | 1.09x |
| 4096 | left overlap | 152.84ms | 19.60ms | 7.80x |
| 4096 | right overlap | 150.98ms | 19.71ms | 7.66x |
| 4096 | middle overlap | 148.63ms | 19.56ms | 7.60x |
| 4096 | no overlap | 23.10ms | 18.78ms | 1.23x |
| 16384 | left overlap | 604.53ms | 75.55ms | 8.00x |
| 16384 | right overlap | 595.73ms | 79.43ms | 7.50x |
| 16384 | middle overlap | 596.21ms | 75.91ms | 7.85x |
| 16384 | no overlap | 91.47ms | 73.11ms | 1.25x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,604.53&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|256%20left%20overlap*|256%20right%20overlap*|256%20middle%20overlap*|256%20no%20overlap*|4096%20left%20overlap*|4096%20right%20overlap*|4096%20middle%20overlap*|4096%20no%20overlap*|16384%20left%20overlap*|16384%20right%20overlap*|16384%20middle%20overlap*|16384%20no%20overlap*&amp;chd=t:10.38,10.22,10.39,2.01,152.84,150.98,148.63,23.10,604.53,595.73,596.21,91.47|2.36,2.35,2.36,1.84,19.60,19.71,19.56,18.78,75.55,79.43,75.91,73.11,_ "Results")
