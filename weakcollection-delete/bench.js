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
