## Benchmark: `bench.js`

```js
'use strict';

const NUM = 32;
const KEYS = Array.from({ length: NUM }, (_, i) => ({ key: i }));
const KEY_VALUES = Array.from(
  { length: NUM },
  (_, i) => [ KEYS[i], { value: i } ]
);

const VARIANTS = {
  'WeakMap-constructor-noarg': () => new WeakMap(),
  'WeakMap-constructor': () => new WeakMap(KEY_VALUES),
  'WeakSet-constructor-noarg': () => new WeakSet(),
  'WeakSet-constructor': () => new WeakSet(KEYS),
  'Map-constructor-noarg': () => new Map(),
  'Map-constructor': () => new Map(KEY_VALUES),
  'Set-constructor-noarg': () => new Set(),
  'Set-constructor': () => new Set(KEYS),
};

const variantName = arguments[0];
const variant = VARIANTS[variantName];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    variant();
  }
}

const start = Date.now();
bench(1e5);
console.log(Date.now() - start);

```

## Results

|        |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| --noopt | new WeakMap() | 8.20ms | 8.20ms | 1.00x |
| --noopt | new WeakMap(keyValues) | 82.85ms | 323.60ms | 0.26x |
| --noopt | new WeakSet() | 8.80ms | 8.00ms | 1.10x |
| --noopt | new WeakSet(keys) | 69.25ms | 71.30ms | 0.97x |
| --noopt | new Map() | 8.25ms | 8.00ms | 1.03x |
| --noopt | new Map(keyValues) | 143.30ms | 414.95ms | 0.35x |
| --noopt | new Set() | 8.30ms | 8.35ms | 0.99x |
| --noopt | new Set(keys) | 108.85ms | 111.80ms | 0.97x |
|  | new WeakMap() | 6.20ms | 6.25ms | 0.99x |
|  | new WeakMap(keyValues) | 79.35ms | 320.55ms | 0.25x |
|  | new WeakSet() | 6.20ms | 6.50ms | 0.95x |
|  | new WeakSet(keys) | 66.45ms | 67.10ms | 0.99x |
|  | new Map() | 6.55ms | 6.55ms | 1.00x |
|  | new Map(keyValues) | 140.85ms | 409.65ms | 0.34x |
|  | new Set() | 6.45ms | 6.15ms | 1.05x |
|  | new Set(keys) | 109.70ms | 109.65ms | 1.00x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,8.8&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|new%20WeakMap()*|new%20WeakSet()*|new%20Map()*|new%20Set()*|new%20WeakMap()|new%20WeakSet()|new%20Map()|new%20Set()&amp;chd=t:8.20,8.80,8.25,8.30,6.20,6.20,6.55,6.45|8.20,8.00,8.00,8.35,6.25,6.50,6.55,6.15,_ "Results")


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,414.95&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|new%20WeakMap(keyValues)*|new%20WeakSet(keys)*|new%20Map(keyValues)*|new%20Set(keys)*|new%20WeakMap(keyValues)|new%20WeakSet(keys)|new%20Map(keyValues)|new%20Set(keys)&amp;chd=t:82.85,69.25,143.30,108.85,79.35,66.45,140.85,109.70|323.60,71.30,414.95,111.80,320.55,67.10,409.65,109.65,_ "Results")
