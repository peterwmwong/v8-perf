## Benchmark: `bench.js`

```js
'use strict';

const LENGTH = +arguments[0];
const VALUES = Array.from({ length: LENGTH }, (_, i) => i);

const TYPED_ARRAY_CONSTRUCTORS = {
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
};

const variantName = arguments[1];
const taConstructor = TYPED_ARRAY_CONSTRUCTORS[variantName];
if (taConstructor === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(TYPED_ARRAY_CONSTRUCTORS).join(', ')}`);
}

const ta = new taConstructor(VALUES);
const findFunc = (_, i) => i === (LENGTH >> 1);

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    ta.find(findFunc);
  }
}

const start = performance.now();
bench(1e4);
console.log(performance.now() - start);

```

## Results

|        |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| 1 | Int8Array.p.find(f) | 3.75ms | 0.70ms | 5.36x |
| 1 | Uint8Array.p.find(f) | 3.66ms | 0.71ms | 5.15x |
| 1 | Uint8ClampedArray.p.find(f) | 3.73ms | 0.68ms | 5.49x |
| 1 | Int16Array.p.find(f) | 3.66ms | 0.69ms | 5.30x |
| 1 | Uint16Array.p.find(f) | 3.70ms | 0.70ms | 5.29x |
| 1 | Int32Array.p.find(f) | 3.75ms | 0.69ms | 5.43x |
| 1 | Uint32Array.p.find(f) | 3.68ms | 0.69ms | 5.33x |
| 1 | Float32Array.p.find(f) | 3.73ms | 0.75ms | 4.97x |
| 1 | Float64Array.p.find(f) | 3.76ms | 0.75ms | 5.01x |
| 8 | Int8Array.p.find(f) | 4.55ms | 3.38ms | 1.35x |
| 8 | Uint8Array.p.find(f) | 4.54ms | 3.39ms | 1.34x |
| 8 | Uint8ClampedArray.p.find(f) | 4.48ms | 3.37ms | 1.33x |
| 8 | Int16Array.p.find(f) | 4.52ms | 3.35ms | 1.35x |
| 8 | Uint16Array.p.find(f) | 4.54ms | 3.40ms | 1.34x |
| 8 | Int32Array.p.find(f) | 4.48ms | 3.37ms | 1.33x |
| 8 | Uint32Array.p.find(f) | 4.66ms | 3.44ms | 1.35x |
| 8 | Float32Array.p.find(f) | 4.77ms | 3.80ms | 1.26x |
| 8 | Float64Array.p.find(f) | 4.80ms | 3.80ms | 1.26x |
| 32 | Int8Array.p.find(f) | 6.00ms | 4.87ms | 1.23x |
| 32 | Uint8Array.p.find(f) | 6.03ms | 4.76ms | 1.27x |
| 32 | Uint8ClampedArray.p.find(f) | 5.98ms | 4.90ms | 1.22x |
| 32 | Int16Array.p.find(f) | 6.00ms | 4.70ms | 1.28x |
| 32 | Uint16Array.p.find(f) | 6.02ms | 4.76ms | 1.26x |
| 32 | Int32Array.p.find(f) | 6.27ms | 4.67ms | 1.34x |
| 32 | Uint32Array.p.find(f) | 6.09ms | 4.93ms | 1.24x |
| 32 | Float32Array.p.find(f) | 6.44ms | 6.02ms | 1.07x |
| 32 | Float64Array.p.find(f) | 6.47ms | 6.05ms | 1.07x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,-Infinity&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|&amp;chd=t:|,_ "Results")


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,6.47&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|Int8Array.p.find(f)*|Uint8Array.p.find(f)*|Uint8ClampedArray.p.find(f)*|Int16Array.p.find(f)*|Uint16Array.p.find(f)*|Int32Array.p.find(f)*|Uint32Array.p.find(f)*|Float32Array.p.find(f)*|Float64Array.p.find(f)*|Int8Array.p.find(f)*|Uint8Array.p.find(f)*|Uint8ClampedArray.p.find(f)*|Int16Array.p.find(f)*|Uint16Array.p.find(f)*|Int32Array.p.find(f)*|Uint32Array.p.find(f)*|Float32Array.p.find(f)*|Float64Array.p.find(f)*|Int8Array.p.find(f)*|Uint8Array.p.find(f)*|Uint8ClampedArray.p.find(f)*|Int16Array.p.find(f)*|Uint16Array.p.find(f)*|Int32Array.p.find(f)*|Uint32Array.p.find(f)*|Float32Array.p.find(f)*|Float64Array.p.find(f)*&amp;chd=t:3.75,3.66,3.73,3.66,3.70,3.75,3.68,3.73,3.76,4.55,4.54,4.48,4.52,4.54,4.48,4.66,4.77,4.80,6.00,6.03,5.98,6.00,6.02,6.27,6.09,6.44,6.47|0.70,0.71,0.68,0.69,0.70,0.69,0.69,0.75,0.75,3.38,3.39,3.37,3.35,3.40,3.37,3.44,3.80,3.80,4.87,4.76,4.90,4.70,4.76,4.67,4.93,6.02,6.05,_ "Results")
