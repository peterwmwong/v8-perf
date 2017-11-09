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
