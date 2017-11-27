## Benchmark: `bench.js`

```js
'use strict';

const LENGTH = 1024 * 10;
const VALUES = Array.from({ length: LENGTH }, (_, i) => i % 128);

const target = new Uint8Array(VALUES);
const source = new Uint8ClampedArray(VALUES);

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
|  | int8Array.set(int8ClampedArray) | 115.65ms | 1.60ms | 72.28x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,115.65&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|int8Array.set(int8ClampedArray)&amp;chd=t:115.65|1.60,_ "Results")
