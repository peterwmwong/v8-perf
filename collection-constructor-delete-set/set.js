'use strict';

const NUM = 32;
const UNIQUE_KEYS = Array.from({ length: NUM }).reduce(
  (acc, _, i) => {
    acc.push({ key: i });
    return acc;
  },
  []
);
const KEYS = [
  ...UNIQUE_KEYS /* adding new keys      */,
  ...UNIQUE_KEYS /* adding existing keys */
];

const VARIANTS = {
  'WeakMap-set': {
    setup: () => new WeakMap(),
    run: (weakmap, key) => weakmap.set(key, {})
  },
  'WeakSet-add': {
    setup: () => new WeakSet(),
    run: (weakset, key) => weakset.add(key)
  }
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
