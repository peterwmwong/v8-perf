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
| 256 | left overlap | 10.33ms | 3.02ms | 3.42x |
| 256 | right overlap | 10.25ms | 3.02ms | 3.39x |
| 256 | middle overlap | 10.40ms | 3.02ms | 3.44x |
| 256 | no overlap | 2.02ms | 2.12ms | 0.95x |
| 4096 | left overlap | 151.08ms | 25.17ms | 6.00x |
| 4096 | right overlap | 149.25ms | 25.42ms | 5.87x |
| 4096 | middle overlap | 149.45ms | 24.97ms | 5.99x |
| 4096 | no overlap | 23.19ms | 23.69ms | 0.98x |
| 16384 | left overlap | 595.80ms | 95.74ms | 6.22x |
| 16384 | right overlap | 591.97ms | 95.68ms | 6.19x |
| 16384 | middle overlap | 604.28ms | 96.18ms | 6.28x |
| 16384 | no overlap | 91.19ms | 93.09ms | 0.98x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,604.28&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)&amp;chdl=before|after&amp;chxl=0:|1:|256%20left%20overlap|256%20right%20overlap|256%20middle%20overlap|256%20no%20overlap|4096%20left%20overlap|4096%20right%20overlap|4096%20middle%20overlap|4096%20no%20overlap|16384%20left%20overlap|16384%20right%20overlap|16384%20middle%20overlap|16384%20no%20overlap&amp;chd=t:10.33,10.25,10.40,2.02,151.08,149.25,149.45,23.19,595.80,591.97,604.28,91.19|3.02,3.02,3.02,2.12,25.17,25.42,24.97,23.69,95.74,95.68,96.18,93.09,_ "Results")
