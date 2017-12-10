## Benchmark: `bench.js`

```js
'use strict';

const LENGTH = +arguments[0];

const VALUES_SMIS = Array.from({ length: LENGTH }, (_, i) => i);
const VALUES_DOUBLES = VALUES_SMIS.map(i => i + 0.5);
const VALUES_OBJS = VALUES_SMIS.map(i => ({}));

const FIND_INDEX = LENGTH - 1;
const PREDICATE =  (_, i) => i === FIND_INDEX;

const VARIANTS = {
  'smis'() {
    VALUES_SMIS.find(PREDICATE);
  },
  'doubles'() {
    VALUES_DOUBLES.find(PREDICATE);
  },
  'objects'() {
    VALUES_OBJS.find(PREDICATE);
  }
}

const variantName = arguments[1];
const variant = VARIANTS[variantName];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    variant();
  }
}

const start = performance.now();
bench(1e5);
console.log(performance.now() - start);

```

## Results

| Array size |  Method  | Before | After | Improvement |
|------------|----------|--------|-------|-------------|
| 1 | array of Smis | 5.08ms | 3.38ms | 1.50x |
| 1 | array of Doubles | 5.98ms | 6.05ms | 0.99x |
| 1 | array of Objects | 4.84ms | 4.81ms | 1.01x |
| 8 | array of Smis | 13.00ms | 5.22ms | 2.49x |
| 8 | array of Doubles | 16.90ms | 16.74ms | 1.01x |
| 8 | array of Objects | 13.05ms | 12.87ms | 1.01x |
| 16 | array of Smis | 21.36ms | 7.12ms | 3.00x |
| 16 | array of Doubles | 26.63ms | 26.86ms | 0.99x |
| 16 | array of Objects | 21.43ms | 21.26ms | 1.01x |
| 32 | array of Smis | 38.18ms | 11.21ms | 3.41x |
| 32 | array of Doubles | 47.82ms | 47.58ms | 1.01x |
| 32 | array of Objects | 38.06ms | 38.19ms | 1.00x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,47.82&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects&amp;chd=t:5.08,5.98,4.84,13.00,16.90,13.05,21.36,26.63,21.43,38.18,47.82,38.06|3.38,6.05,4.81,5.22,16.74,12.87,7.12,26.86,21.26,11.21,47.58,38.19,_ "Results")
