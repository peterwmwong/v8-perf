## Benchmark: `bench.js`

```js
'use strict';

const length = +arguments[0];

const smiEntry = (v, i) => i;
const doubleEntry = (v, i) => i + 0.5;
const objectEntry = (v, i, a) => ({});
const reduceEntry = makeEntryFunc =>
  (arr, v, i, a) => {
    arr.push(makeEntryFunc(v, i, a));
    return arr;
  }

const PACKED_SMIS = Array.from({ length }).reduce(reduceEntry(smiEntry), []);
const PACKED_DOUBLES = Array.from({ length }).reduce(reduceEntry(doubleEntry), []);
const PACKED_OBJS = Array.from({ length }).reduce(reduceEntry(objectEntry), []);

// console.log(PACKED_SMIS);
// console.log(PACKED_DOUBLES);
// console.log(PACKED_OBJS);
// console.log(%HasHoleyElements(PACKED_SMIS));
// console.log(%HasHoleyElements(PACKED_DOUBLES));
// console.log(%HasHoleyElements(PACKED_OBJS));

const HOLEY_SMIS = Array.from({ length }, smiEntry);
const HOLEY_DOUBLES = Array.from({ length }, doubleEntry);
const HOLEY_OBJS = Array.from({ length }, objectEntry);

// console.log(HOLEY_SMIS);
// console.log(HOLEY_DOUBLES);
// console.log(HOLEY_OBJS);
// console.log(%HasHoleyElements(HOLEY_SMIS));
// console.log(%HasHoleyElements(HOLEY_DOUBLES));
// console.log(%HasHoleyElements(HOLEY_OBJS));

const predicate = (v, i, a) => v === a[a.length - 1];
const findIndexFunc = arr => arr.findIndex(predicate);

const VARIANTS = {
  'smis': {
    array: PACKED_SMIS,
    func: findIndexFunc
  },
  'doubles': {
    array: PACKED_DOUBLES,
    func: findIndexFunc
  },
  'objects': {
    array: PACKED_OBJS,
    func: findIndexFunc
  },
  'smis-holey': {
    array: HOLEY_SMIS,
    func: findIndexFunc
  },
  'doubles-holey': {
    array: HOLEY_DOUBLES,
    func: findIndexFunc
  },
  'objects-holey': {
    array: HOLEY_OBJS,
    func: findIndexFunc
  },
}

const variantName = arguments[1];
const variant = VARIANTS[variantName];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

const { func, array } = variant;
const start = performance.now();
let result;
for (let iter = 0; iter < 1e5; iter++) {
  result = func(array);
}
console.log(performance.now() - start);

```

## Results

| Array size |  Method  | Before | After | Improvement |
|------------|----------|--------|-------|-------------|
| 1 | array of Smis | 6.56ms | 5.01ms | 1.31x |
| 1 | array of Doubles | 7.71ms | 5.38ms | 1.43x |
| 1 | array of Objects | 6.47ms | 5.14ms | 1.26x |
| 1 | holey array of Smis | 6.36ms | 5.15ms | 1.23x |
| 1 | holey array of Doubles | 6.53ms | 5.55ms | 1.18x |
| 1 | holey array of Objects | 6.45ms | 5.29ms | 1.22x |
| 8 | array of Smis | 12.10ms | 6.58ms | 1.84x |
| 8 | array of Doubles | 15.70ms | 7.82ms | 2.01x |
| 8 | array of Objects | 12.18ms | 7.09ms | 1.72x |
| 8 | holey array of Smis | 12.47ms | 7.24ms | 1.72x |
| 8 | holey array of Doubles | 12.95ms | 7.91ms | 1.64x |
| 8 | holey array of Objects | 12.53ms | 7.32ms | 1.71x |
| 16 | array of Smis | 19.07ms | 7.88ms | 2.42x |
| 16 | array of Doubles | 24.48ms | 9.60ms | 2.55x |
| 16 | array of Objects | 19.14ms | 8.41ms | 2.28x |
| 16 | holey array of Smis | 19.55ms | 8.87ms | 2.20x |
| 16 | holey array of Doubles | 21.35ms | 10.34ms | 2.06x |
| 16 | holey array of Objects | 19.51ms | 9.02ms | 2.16x |
| 32 | array of Smis | 30.72ms | 10.76ms | 2.86x |
| 32 | array of Doubles | 40.72ms | 12.91ms | 3.15x |
| 32 | array of Objects | 31.10ms | 11.75ms | 2.65x |
| 32 | holey array of Smis | 31.59ms | 12.59ms | 2.51x |
| 32 | holey array of Doubles | 34.98ms | 16.53ms | 2.12x |
| 32 | holey array of Objects | 31.59ms | 13.04ms | 2.42x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,40.72&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|holey%20array%20of%20Smis|holey%20array%20of%20Doubles|holey%20array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|holey%20array%20of%20Smis|holey%20array%20of%20Doubles|holey%20array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|holey%20array%20of%20Smis|holey%20array%20of%20Doubles|holey%20array%20of%20Objects|array%20of%20Smis|array%20of%20Doubles|array%20of%20Objects|holey%20array%20of%20Smis|holey%20array%20of%20Doubles|holey%20array%20of%20Objects&amp;chd=t:6.56,7.71,6.47,6.36,6.53,6.45,12.10,15.70,12.18,12.47,12.95,12.53,19.07,24.48,19.14,19.55,21.35,19.51,30.72,40.72,31.10,31.59,34.98,31.59|5.01,5.38,5.14,5.15,5.55,5.29,6.58,7.82,7.09,7.24,7.91,7.32,7.88,9.60,8.41,8.87,10.34,9.02,10.76,12.91,11.75,12.59,16.53,13.04,_ "Results")
