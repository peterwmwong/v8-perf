'use strict';

const NUM = 32;
const KEYS = Array.from({ length: NUM }).reduce(
  (acc, _, i) => {
    acc.push({ key: i });
    return acc;
  },
  []
);
const KEY_VALUES = KEYS.reduce(
  (acc, key, i) => {
    acc.push([key, { value: i }])
    return acc;
  },
  []
);

const VARIANTS = {
  'WeakMap-delete': {
    setup: () => new WeakMap(KEY_VALUES),
    run: (weakmap, key) => weakmap.delete(key)
  },
  'WeakSet-delete': {
    setup: () => new WeakSet(KEYS),
    run: (weakset, key) => weakset.delete(key)
  },
};

const variantName = arguments[0];
const variant = VARIANTS[variantName];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}
const { setup, run } = variant;

function bench(iters) {
  let setupTime = 0.0;
  for (let iter = 0; iter < iters; iter++) {
    const setupStart = performance.now();
    const col = setup();
    setupTime += (performance.now() - setupStart);

    for (const key of KEYS) {
      run(col, key);
    }
  }
  return setupTime;
}

const start = performance.now();
const setupTime = bench(1e5);
console.log(performance.now() - start - setupTime);
