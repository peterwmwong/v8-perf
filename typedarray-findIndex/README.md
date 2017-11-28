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
    ta.findIndex(findFunc);
  }
}

const start = performance.now();
bench(1e4);
console.log(performance.now() - start);

```

## Results

|        |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| 1 | Int8Array.p.find(f) | 3.64ms | 0.69ms | 5.28x |
| 1 | Uint8Array.p.find(f) | 3.65ms | 0.68ms | 5.37x |
| 1 | Uint8ClampedArray.p.find(f) | 3.62ms | 0.68ms | 5.32x |
| 1 | Int16Array.p.find(f) | 3.68ms | 0.69ms | 5.33x |
| 1 | Uint16Array.p.find(f) | 3.61ms | 0.68ms | 5.31x |
| 1 | Int32Array.p.find(f) | 3.68ms | 0.71ms | 5.18x |
| 1 | Uint32Array.p.find(f) | 3.71ms | 0.71ms | 5.23x |
| 1 | Float32Array.p.find(f) | 3.74ms | 0.76ms | 4.92x |
| 1 | Float64Array.p.find(f) | 3.72ms | 0.76ms | 4.89x |
| 8 | Int8Array.p.find(f) | 4.45ms | 3.38ms | 1.32x |
| 8 | Uint8Array.p.find(f) | 4.50ms | 3.45ms | 1.30x |
| 8 | Uint8ClampedArray.p.find(f) | 4.41ms | 3.38ms | 1.30x |
| 8 | Int16Array.p.find(f) | 4.42ms | 3.43ms | 1.29x |
| 8 | Uint16Array.p.find(f) | 4.47ms | 3.36ms | 1.33x |
| 8 | Int32Array.p.find(f) | 4.46ms | 3.36ms | 1.33x |
| 8 | Uint32Array.p.find(f) | 4.47ms | 3.41ms | 1.31x |
| 8 | Float32Array.p.find(f) | 4.71ms | 3.76ms | 1.25x |
| 8 | Float64Array.p.find(f) | 4.82ms | 3.74ms | 1.29x |
| 32 | Int8Array.p.find(f) | 5.87ms | 4.83ms | 1.22x |
| 32 | Uint8Array.p.find(f) | 5.99ms | 4.68ms | 1.28x |
| 32 | Uint8ClampedArray.p.find(f) | 5.92ms | 4.71ms | 1.26x |
| 32 | Int16Array.p.find(f) | 5.91ms | 4.68ms | 1.26x |
| 32 | Uint16Array.p.find(f) | 5.99ms | 4.71ms | 1.27x |
| 32 | Int32Array.p.find(f) | 5.88ms | 4.72ms | 1.25x |
| 32 | Uint32Array.p.find(f) | 6.01ms | 4.70ms | 1.28x |
| 32 | Float32Array.p.find(f) | 6.32ms | 6.03ms | 1.05x |
| 32 | Float64Array.p.find(f) | 6.23ms | 6.01ms | 1.04x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,-Infinity&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|&amp;chd=t:|,_ "Results")


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,6.32&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|Int8Array.p.find(f)*|Uint8Array.p.find(f)*|Uint8ClampedArray.p.find(f)*|Int16Array.p.find(f)*|Uint16Array.p.find(f)*|Int32Array.p.find(f)*|Uint32Array.p.find(f)*|Float32Array.p.find(f)*|Float64Array.p.find(f)*|Int8Array.p.find(f)*|Uint8Array.p.find(f)*|Uint8ClampedArray.p.find(f)*|Int16Array.p.find(f)*|Uint16Array.p.find(f)*|Int32Array.p.find(f)*|Uint32Array.p.find(f)*|Float32Array.p.find(f)*|Float64Array.p.find(f)*|Int8Array.p.find(f)*|Uint8Array.p.find(f)*|Uint8ClampedArray.p.find(f)*|Int16Array.p.find(f)*|Uint16Array.p.find(f)*|Int32Array.p.find(f)*|Uint32Array.p.find(f)*|Float32Array.p.find(f)*|Float64Array.p.find(f)*&amp;chd=t:3.64,3.65,3.62,3.68,3.61,3.68,3.71,3.74,3.72,4.45,4.50,4.41,4.42,4.47,4.46,4.47,4.71,4.82,5.87,5.99,5.92,5.91,5.99,5.88,6.01,6.32,6.23|0.69,0.68,0.68,0.69,0.68,0.71,0.71,0.76,0.76,3.38,3.45,3.38,3.43,3.36,3.36,3.41,3.76,3.74,4.83,4.68,4.71,4.68,4.71,4.72,4.70,6.03,6.01,_ "Results")
