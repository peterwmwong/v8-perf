## Benchmark: `bench.js`

```js
'use strict';

const NUM = 32;
const KEYS = Array.from({ length: NUM }, (_, i) => ({ key: i }));
const KEY_VALUES = Array.from(
  { length: NUM },
  (_, i) => [ KEYS[i], { value: i } ]
);

const weakColDelete = (weakcol, key) => { weakcol.delete(key); };
const weakColDeleteNonMember = (weakcol, key) => { weakcol.delete({}); };

const VARIANTS = {
  'WeakMap-delete': {
    setup(){ return new WeakMap(KEY_VALUES); },
    run: weakColDelete
  },
  'WeakSet-delete': {
    setup(){ return new WeakSet(KEYS); },
    run: weakColDelete
  },
  'WeakMap-delete-nonmember': {
    setup(){ return new WeakMap(KEY_VALUES); },
    run: weakColDeleteNonMember
  },
  'WeakSet-delete-nonmember': {
    setup(){ return new WeakSet(KEYS); },
    run: weakColDeleteNonMember
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
| --noopt | WeakMap.delete(key) | 126.45ms | 80.90ms | 1.56x |
| --noopt | WeakSet.delete(key) | 119.55ms | 72.85ms | 1.64x |
| --noopt | WeakMap.delete(nonMemberKey) | 111.30ms | 78.75ms | 1.41x |
| --noopt | WeakSet.delete(nonMemberKey) | 103.50ms | 70.00ms | 1.48x |
|  | WeakMap.delete(key) | 57.70ms | 27.85ms | 2.07x |
|  | WeakSet.delete(key) | 56.90ms | 26.50ms | 2.15x |
|  | WeakMap.delete(nonMemberKey) | 44.00ms | 25.70ms | 1.71x |
|  | WeakSet.delete(nonMemberKey) | 41.30ms | 24.00ms | 1.72x |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,126.45&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|WeakMap.delete(key)*|WeakSet.delete(key)*|WeakMap.delete(nonMemberKey)*|WeakSet.delete(nonMemberKey)*|WeakMap.delete(key)|WeakSet.delete(key)|WeakMap.delete(nonMemberKey)|WeakSet.delete(nonMemberKey)&amp;chd=t:126.45,119.55,111.30,103.50,57.70,56.90,44.00,41.30|80.90,72.85,78.75,70.00,27.85,26.50,25.70,24.00,_ "Results")
