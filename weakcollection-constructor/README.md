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
| --noopt | new WeakMap() | 13.65ms | 8.45ms | 1.62x |
| --noopt | new WeakMap(keyValues) | 454.90ms | 79.85ms | 5.70x |
| --noopt | new WeakSet() | 13.65ms | 8.60ms | 1.59x |
| --noopt | new WeakSet(keys) | 376.50ms | 69.75ms | 5.40x |
| --noopt | new Map() | 9.25ms | 8.45ms | 1.09x |
| --noopt | new Map(keyValues) | 512.45ms | 140.25ms | 3.65x |
| --noopt | new Set() | 9.00ms | 8.05ms | 1.12x |
| --noopt | new Set(keys) | 196.80ms | 110.30ms | 1.78x |
|  | new WeakMap() | 10.15ms | 6.30ms | 1.61x |
|  | new WeakMap(keyValues) | 153.35ms | 78.30ms | 1.96x |
|  | new WeakSet() | 10.55ms | 6.60ms | 1.60x |
|  | new WeakSet(keys) | 141.45ms | 68.15ms | 2.08x |
|  | new Map() | 7.45ms | 6.55ms | 1.14x |
|  | new Map(keyValues) | 517.95ms | 136.30ms | 3.80x |
|  | new Set() | 7.05ms | 6.20ms | 1.14x |
|  | new Set(keys) | 195.55ms | 108.60ms | 1.80x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,13.65&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|new%20WeakMap()*|new%20WeakSet()*|new%20Map()*|new%20Set()*|new%20WeakMap()|new%20WeakSet()|new%20Map()|new%20Set()&amp;chd=t:13.65,13.65,9.25,9.00,10.15,10.55,7.45,7.05|8.45,8.60,8.45,8.05,6.30,6.60,6.55,6.20,_ "Results")


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,517.95&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|new%20WeakMap(keyValues)*|new%20WeakSet(keys)*|new%20Map(keyValues)*|new%20Set(keys)*|new%20WeakMap(keyValues)|new%20WeakSet(keys)|new%20Map(keyValues)|new%20Set(keys)&amp;chd=t:454.90,376.50,512.45,196.80,153.35,141.45,517.95,195.55|79.85,69.75,140.25,110.30,78.30,68.15,136.30,108.60,_ "Results")
