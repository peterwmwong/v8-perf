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
| 1 | array of Smis | 4.97ms | 3.57ms | 1.39x |
| 1 | array of Doubles | 6.12ms | 6.19ms | 0.99x |
| 1 | array of Objects | 4.89ms | 4.83ms | 1.01x |
| 8 | array of Smis | 13.05ms | 5.26ms | 2.48x |
| 8 | array of Doubles | 16.39ms | 16.59ms | 0.99x |
| 8 | array of Objects | 13.08ms | 13.31ms | 0.98x |
| 16 | array of Smis | 21.62ms | 6.96ms | 3.11x |
| 16 | array of Doubles | 26.75ms | 26.45ms | 1.01x |
| 16 | array of Objects | 21.44ms | 21.65ms | 0.99x |
| 32 | array of Smis | 38.50ms | 11.13ms | 3.46x |
| 32 | array of Doubles | 47.67ms | 47.84ms | 1.00x |
| 32 | array of Objects | 40.39ms | 39.61ms | 1.02x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,47.84&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|array%20of%20Smis%201|array%20of%20Doubles%201|array%20of%20Objects%201|array%20of%20Smis%208|array%20of%20Doubles%208|array%20of%20Objects%208|array%20of%20Smis%2016|array%20of%20Doubles%2016|array%20of%20Objects%2016|array%20of%20Smis%2032|array%20of%20Doubles%2032|array%20of%20Objects%2032&amp;chd=t:4.97,6.12,4.89,13.05,16.39,13.08,21.62,26.75,21.44,38.50,47.67,40.39|3.57,6.19,4.83,5.26,16.59,13.31,6.96,26.45,21.65,11.13,47.84,39.61,_ "Results")
