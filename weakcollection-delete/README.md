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
| --noopt | WeakMap.delete(key) | 126.80ms | 81.70ms | 1.55x |
| --noopt | WeakSet.delete(key) | 119.70ms | 73.60ms | 1.63x |
|  | WeakMap.delete(key) | 56.70ms | 28.20ms | 2.01x |
|  | WeakSet.delete(key) | 56.35ms | 26.70ms | 2.11x |
