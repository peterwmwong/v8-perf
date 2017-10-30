## Benchmark: `bench.js`

```js
'use strict';

const NUM = 32;
const KEYS = Array.from({ length: NUM }, (_, i) => ({ key: i }));
const KEY_VALUES = Array.from(
  { length: NUM },
  (_, i) => [ KEYS[i], { value: i } ]
);

const weakMapSet = (weakmap, key) => { weakmap.set(key, {}); };
const weakSetAdd = (weakset, key) => { weakset.add(key); };

const VARIANTS = {
  'WeakMap-constructor': {
    setup(){ return null; },
    run(){ return new WeakMap(KEY_VALUES); }
  },
  'WeakMap-set-existing': {
    setup(){ return new WeakMap(KEY_VALUES); },
    run: weakMapSet
  },
  'WeakMap-set-new': {
    setup(){ return new WeakMap(); },
    run: weakMapSet
  },

  'WeakSet-constructor': {
    setup(){ return null; },
    run() { return new WeakSet(KEYS); }
  },
  'WeakSet-add-existing': {
    setup(){ return new WeakSet(KEYS); },
    run: weakSetAdd
  },
  'WeakSet-add-new': {
    setup(){ return new WeakSet(); },
    run: weakSetAdd
  }
};

const variantName = arguments[0];
const variant = VARIANTS[variantName];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

const { setup, run } = variant;

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    const weakCollection = setup();
    for (const key of KEYS) {
      run(weakCollection, key);
    }
  }
}

const start = Date.now();
bench(1e4);
console.log(Date.now() - start);

```

## Results

|        |  Method  | Before | After | Improvement |
|--------|----------|--------|-------|-------------|
| --noopt | new WeakMap(pairs) | 2192.00ms | 1436.50ms | 1.53x |
| --noopt | new WeakSet(keys) | 1960.15ms | 1191.30ms | 1.65x |
| --noopt | WeakMap.set(existingKey, value) | 129.15ms | 81.85ms | 1.58x |
| --noopt | WeakMap.set(key, value) | 72.50ms | 50.25ms | 1.44x |
| --noopt | WeakSet.add(existingKey) | 117.25ms | 69.05ms | 1.70x |
| --noopt | WeakSet.add(key) | 70.45ms | 46.35ms | 1.52x |
|  | new WeakMap(pairs) | 953.20ms | 482.05ms | 1.98x |
|  | new WeakSet(keys) | 907.45ms | 445.50ms | 2.04x |
|  | WeakMap.set(existingKey, value) | 54.55ms | 26.65ms | 2.05x |
|  | WeakMap.set(key, value) | 36.85ms | 21.30ms | 1.73x |
|  | WeakSet.add(existingKey) | 52.25ms | 23.20ms | 2.25x |
|  | WeakSet.add(key) | 34.20ms | 19.75ms | 1.73x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,2192&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|new%20WeakMap(pairs)*|new%20WeakSet(keys)*|new%20WeakMap(pairs)|new%20WeakSet(keys)&amp;chd=t:2192.00,1960.15,953.20,907.45|1436.50,1191.30,482.05,445.50,_ "Results")


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,129.15&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|WeakMap.set(existingKey,%20value)*|WeakMap.set(key,%20value)*|WeakSet.add(existingKey)*|WeakSet.add(key)*|WeakMap.set(existingKey,%20value)|WeakMap.set(key,%20value)|WeakSet.add(existingKey)|WeakSet.add(key)&amp;chd=t:129.15,72.50,117.25,70.45,54.55,36.85,52.25,34.20|81.85,50.25,69.05,46.35,26.65,21.30,23.20,19.75,_ "Results")
