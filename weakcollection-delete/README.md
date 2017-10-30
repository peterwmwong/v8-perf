## Benchmark: `bench.js`

```js
'use strict';

const NUM = 32;
const KEYS = Array.from({ length: NUM }, (_, i) => ({ key: i }));
const KEY_VALUES = Array.from(
  { length: NUM },
  (_, i) => [ KEYS[i], { value: i } ]
);

const weakColSet = (weakcol, key) => { weakcol.delete(key); };

const VARIANTS = {
  'WeakMap-delete': {
    setup(){ return new WeakMap(KEY_VALUES); },
    run: weakColSet
  },
  'WeakSet-delete': {
    setup(){ return new WeakSet(KEYS); },
    run: weakColSet
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
| --noopt | WeakMap.delete(key) | 126.35ms | 80.90ms | 1.56x |
| --noopt | WeakSet.delete(key) | 119.85ms | 72.75ms | 1.65x |
|  | WeakMap.delete(key) | 56.65ms | 28.20ms | 2.01x |
|  | WeakSet.delete(key) | 55.75ms | 26.65ms | 2.09x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,126.35&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|WeakMap.delete(key)*|WeakSet.delete(key)*|WeakMap.delete(key)|WeakSet.delete(key)&amp;chd=t:126.35,119.85,56.65,55.75|80.90,72.75,28.20,26.65,_ "Results")
