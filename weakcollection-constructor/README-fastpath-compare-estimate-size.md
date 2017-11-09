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
| --noopt | new WeakMap() | 8.05ms | 7.90ms | 1.02x |
| --noopt | new WeakMap(keyValues) | 82.45ms | 156.80ms | 0.53x |
| --noopt | new WeakSet() | 8.10ms | 7.75ms | 1.05x |
| --noopt | new WeakSet(keys) | 69.15ms | 143.05ms | 0.48x |
| --noopt | new Map() | 8.60ms | 8.65ms | 0.99x |
| --noopt | new Map(keyValues) | 143.15ms | 143.20ms | 1.00x |
| --noopt | new Set() | 7.90ms | 8.15ms | 0.97x |
| --noopt | new Set(keys) | 108.25ms | 112.25ms | 0.96x |
|  | new WeakMap() | 6.75ms | 6.25ms | 1.08x |
|  | new WeakMap(keyValues) | 79.00ms | 151.15ms | 0.52x |
|  | new WeakSet() | 6.30ms | 6.25ms | 1.01x |
|  | new WeakSet(keys) | 67.20ms | 139.85ms | 0.48x |
|  | new Map() | 6.65ms | 6.70ms | 0.99x |
|  | new Map(keyValues) | 139.70ms | 139.60ms | 1.00x |
|  | new Set() | 6.15ms | 6.10ms | 1.01x |
|  | new Set(keys) | 109.15ms | 110.10ms | 0.99x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,8.65&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|new%20WeakMap()*|new%20WeakSet()*|new%20Map()*|new%20Set()*|new%20WeakMap()|new%20WeakSet()|new%20Map()|new%20Set()&amp;chd=t:8.05,8.10,8.60,7.90,6.75,6.30,6.65,6.15|7.90,7.75,8.65,8.15,6.25,6.25,6.70,6.10,_ "Results")


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,156.8&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|new%20WeakMap(keyValues)*|new%20WeakSet(keys)*|new%20Map(keyValues)*|new%20Set(keys)*|new%20WeakMap(keyValues)|new%20WeakSet(keys)|new%20Map(keyValues)|new%20Set(keys)&amp;chd=t:82.45,69.15,143.15,108.25,79.00,67.20,139.70,109.15|156.80,143.05,143.20,112.25,151.15,139.85,139.60,110.10,_ "Results")
