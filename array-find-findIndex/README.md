## Benchmark: `bench.js`

```js
'use strict';

const LENGTH = +arguments[0];

const VALUES_SMIS = Array.from({ length: LENGTH }, (_, i) => i);
const VALUES_DOUBLES = VALUES_SMIS.map(i => i + 0.5);
const VALUES_OBJS = VALUES_SMIS.map(i => ({}));

const FIND_INDEX = (LENGTH / 2) | 0;
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
  },

  'smis-index'() {
    VALUES_SMIS.findIndex(PREDICATE);
  },
  'doubles-index'() {
    VALUES_DOUBLES.findIndex(PREDICATE);
  },
  'objects-index'() {
    VALUES_OBJS.findIndex(PREDICATE);
  },
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

|   | Array size |  Method  | Before | After | Improvement |
|---|------------|----------|--------|-------|-------------|
| --noopt | 1 | array of Smis | 15.65ms | 8.06ms | 1.94x |
| --noopt | 1 | array of Doubles | 16.47ms | 9.29ms | 1.77x |
| --noopt | 1 | array of Objects | 15.56ms | 8.06ms | 1.93x |
| --noopt | 1 | array of Smis | 15.38ms | 7.91ms | 1.94x |
| --noopt | 1 | array of Doubles | 16.47ms | 9.14ms | 1.80x |
| --noopt | 1 | array of Objects | 15.37ms | 8.04ms | 1.91x |
| --noopt | 8 | array of Smis | 37.71ms | 17.44ms | 2.16x |
| --noopt | 8 | array of Doubles | 40.89ms | 20.85ms | 1.96x |
| --noopt | 8 | array of Objects | 37.81ms | 17.38ms | 2.18x |
| --noopt | 8 | array of Smis | 37.72ms | 17.49ms | 2.16x |
| --noopt | 8 | array of Doubles | 40.30ms | 20.56ms | 1.96x |
| --noopt | 8 | array of Objects | 37.58ms | 17.69ms | 2.12x |
| --noopt | 32 | array of Smis | 98.83ms | 43.78ms | 2.26x |
| --noopt | 32 | array of Doubles | 105.93ms | 48.61ms | 2.18x |
| --noopt | 32 | array of Objects | 98.47ms | 43.83ms | 2.25x |
| --noopt | 32 | array of Smis | 98.21ms | 42.89ms | 2.29x |
| --noopt | 32 | array of Doubles | 104.41ms | 47.90ms | 2.18x |
| --noopt | 32 | array of Objects | 97.89ms | 42.95ms | 2.28x |
|  | 1 | array of Smis | 5.65ms | 4.89ms | 1.16x |
|  | 1 | array of Doubles | 6.79ms | 5.94ms | 1.14x |
|  | 1 | array of Objects | 5.73ms | 4.94ms | 1.16x |
|  | 1 | array of Smis | 5.72ms | 4.95ms | 1.16x |
|  | 1 | array of Doubles | 6.77ms | 5.92ms | 1.14x |
|  | 1 | array of Objects | 5.63ms | 4.91ms | 1.15x |
|  | 8 | array of Smis | 10.10ms | 9.17ms | 1.10x |
|  | 8 | array of Doubles | 12.68ms | 11.52ms | 1.10x |
|  | 8 | array of Objects | 10.08ms | 9.13ms | 1.10x |
|  | 8 | array of Smis | 9.96ms | 9.29ms | 1.07x |
|  | 8 | array of Doubles | 12.47ms | 12.11ms | 1.03x |
|  | 8 | array of Objects | 10.01ms | 9.13ms | 1.10x |
|  | 32 | array of Smis | 23.49ms | 22.26ms | 1.06x |
|  | 32 | array of Doubles | 29.72ms | 27.50ms | 1.08x |
|  | 32 | array of Objects | 23.42ms | 22.63ms | 1.03x |
|  | 32 | array of Smis | 22.91ms | 22.44ms | 1.02x |
|  | 32 | array of Doubles | 29.37ms | 27.28ms | 1.08x |
|  | 32 | array of Objects | 22.78ms | 22.48ms | 1.01x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,105.93&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|array%20of%20Smis*|array%20of%20Doubles*|array%20of%20Objects*|array%20of%20Smis*|array%20of%20Doubles*|array%20of%20Objects*|array%20of%20Smis*|array%20of%20Doubles*|array%20of%20Objects*|array%20of%20Smis*|array%20of%20Doubles*|array%20of%20Objects*|array%20of%20Smis*|array%20of%20Doubles*|array%20of%20Objects*|array%20of%20Smis*|array%20of%20Doubles*|array%20of%20Objects*&amp;chd=t:15.65,16.47,15.56,15.38,16.47,15.37,37.71,40.89,37.81,37.72,40.30,37.58,98.83,105.93,98.47,98.21,104.41,97.89|8.06,9.29,8.06,7.91,9.14,8.04,17.44,20.85,17.38,17.49,20.56,17.69,43.78,48.61,43.83,42.89,47.90,42.95,_ "Results")


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,29.72&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects&amp;chd=t:5.65,6.79,5.73,5.72,6.77,5.63,10.10,12.68,10.08,9.96,12.47,10.01,23.49,29.72,23.42,22.91,29.37,22.78|4.89,5.94,4.94,4.95,5.92,4.91,9.17,11.52,9.13,9.29,12.11,9.13,22.26,27.50,22.63,22.44,27.28,22.48,_ "Results")
