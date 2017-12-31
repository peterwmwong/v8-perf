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
| 256 | left overlap | 10.85ms | 3.20ms | 3.39x |
| 256 | right overlap | 10.20ms | 3.64ms | 2.80x |
| 256 | middle overlap | 10.96ms | 3.43ms | 3.20x |
| 256 | no overlap | 2.08ms | 2.09ms | 1.00x |
| 4096 | left overlap | 152.03ms | 30.41ms | 5.00x |
| 4096 | right overlap | 147.06ms | 35.66ms | 4.12x |
| 4096 | middle overlap | 160.55ms | 33.19ms | 4.84x |
| 4096 | no overlap | 24.50ms | 24.82ms | 0.99x |
| 16384 | left overlap | 600.35ms | 116.59ms | 5.15x |
| 16384 | right overlap | 597.27ms | 139.93ms | 4.27x |
| 16384 | middle overlap | 598.75ms | 128.57ms | 4.66x |
| 16384 | no overlap | 91.65ms | 97.32ms | 0.94x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,600.35&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)&amp;chdl=before|after&amp;chxl=0:|1:|256%20left%20overlap|256%20right%20overlap|256%20middle%20overlap|256%20no%20overlap|4096%20left%20overlap|4096%20right%20overlap|4096%20middle%20overlap|4096%20no%20overlap|16384%20left%20overlap|16384%20right%20overlap|16384%20middle%20overlap|16384%20no%20overlap&amp;chd=t:10.85,10.20,10.96,2.08,152.03,147.06,160.55,24.50,600.35,597.27,598.75,91.65|3.20,3.64,3.43,2.09,30.41,35.66,33.19,24.82,116.59,139.93,128.57,97.32,_ "Results")
