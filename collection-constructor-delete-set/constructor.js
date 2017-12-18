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
  'WeakMap-constructor': () => new WeakMap(KEY_VALUES),
  'WeakSet-constructor': () => new WeakSet(KEYS),
  'Map-constructor': () => new Map(KEY_VALUES),
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

const start = performance.now();
bench(1e5);
console.log(performance.now() - start);
