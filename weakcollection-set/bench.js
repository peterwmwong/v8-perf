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
  'WeakMap-set-existing': {
    setup(){ return new WeakMap(KEY_VALUES); },
    run: weakMapSet
  },
  'WeakMap-set-new': {
    setup(){ return new WeakMap(); },
    run: weakMapSet
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
