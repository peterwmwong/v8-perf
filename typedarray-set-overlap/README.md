## Benchmark: `bench.js`

```js
'use strict';

const LENGTH = 1024 * 10;
const VALUES = Array.from({ length: LENGTH }, (_, i) => i % 128);

const ab = new ArrayBuffer(LENGTH);
new Int8Array(ab).set(VALUES);

const target = new Int8Array(ab, 0, LENGTH/2);
const source = new Int16Array(ab, LENGTH/4, LENGTH/4);

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    target.set(source);
  }
}

const start = Date.now();
bench(1e4);
console.log(Date.now() - start);

```

## Results

|        |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| --noopt | overlap | 187.55ms | 30.30ms | 6.19x |
|  | overlap | 178.85ms | 29.95ms | 5.97x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,187.55&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|overlap*|overlap&amp;chd=t:187.55,178.85|30.30,29.95,_ "Results")
