## Benchmark: `bench.js`

```js
'use strict';

const LENGTH = +arguments[0];

const VALUES_SMIS = Array.from({ length: LENGTH }, (_, i) => i);
const VALUES_DOUBLES = VALUES_SMIS.map(i => i + 0.5);
const VALUES_OBJS = VALUES_SMIS.map(i => ({}));

const PREDICATE =  (_, i, a) => i === a.length - 1;

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
| 1 | array of Smis | 4.67ms | 3.56ms | 1.31x |
| 1 | array of Doubles | 5.84ms | 3.59ms | 1.63x |
| 1 | array of Objects | 4.64ms | 4.64ms | 1.00x |
| 8 | array of Smis | 9.76ms | 5.62ms | 1.74x |
| 8 | array of Doubles | 13.02ms | 6.30ms | 2.07x |
| 8 | array of Objects | 9.78ms | 9.82ms | 1.00x |
| 16 | array of Smis | 16.96ms | 7.20ms | 2.36x |
| 16 | array of Doubles | 21.90ms | 8.23ms | 2.66x |
| 16 | array of Objects | 16.88ms | 16.81ms | 1.00x |
| 32 | array of Smis | 28.48ms | 10.23ms | 2.78x |
| 32 | array of Doubles | 37.81ms | 12.18ms | 3.10x |
| 32 | array of Objects | 28.36ms | 28.48ms | 1.00x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,37.81&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|array%20of%20Smis%201|array%20of%20Doubles%201|array%20of%20Objects%201|array%20of%20Smis%208|array%20of%20Doubles%208|array%20of%20Objects%208|array%20of%20Smis%2016|array%20of%20Doubles%2016|array%20of%20Objects%2016|array%20of%20Smis%2032|array%20of%20Doubles%2032|array%20of%20Objects%2032&amp;chd=t:4.67,5.84,4.64,9.76,13.02,9.78,16.96,21.90,16.88,28.48,37.81,28.36|3.56,3.59,4.64,5.62,6.30,9.82,7.20,8.23,16.81,10.23,12.18,28.48,_ "Results")
