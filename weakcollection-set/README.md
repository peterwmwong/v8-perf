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
| --noopt | new WeakMap(keyValuePairs) | 2219.05ms | 1424.60ms | 1.56x |
| --noopt | new WeakSet(keys) | 1953.25ms | 1178.00ms | 1.66x |
| --noopt | WeakMap.set(existingKey, newValue) | 128.50ms | 80.25ms | 1.60x |
| --noopt | WeakMap.set(newKey, newValue) | 74.40ms | 49.45ms | 1.50x |
| --noopt | WeakSet.add(existingKey) | 115.75ms | 68.65ms | 1.69x |
| --noopt | WeakSet.add(newKey) | 70.45ms | 45.85ms | 1.54x |
|  | new WeakMap(keyValuePairs) | 952.35ms | 480.15ms | 1.98x |
|  | new WeakSet(keys) | 914.35ms | 444.65ms | 2.06x |
|  | WeakMap.set(existingKey, newValue) | 54.25ms | 25.75ms | 2.11x |
|  | WeakMap.set(newKey, newValue) | 37.40ms | 20.65ms | 1.81x |
|  | WeakSet.add(existingKey) | 51.60ms | 22.80ms | 2.26x |
|  | WeakSet.add(newKey) | 34.60ms | 20.10ms | 1.72x |
