'use strict';

const LENGTH = +arguments[0];

const VALUES_SMIS = Array.from({ length: LENGTH }, (_, i) => i);
const VALUES_DOUBLES = VALUES_SMIS.map(i => i + 0.5);
const VALUES_OBJS = VALUES_SMIS.map(i => ({}));

const FIND_INDEX = (LENGTH / 2) | 0;
const PREDICATE =  (_, i) => i === FIND_INDEX;

const VARIANTS = {
  'smis'() {
    VALUES_SMIS.find(PREDICATE);
  },
  'doubles'() {
    VALUES_DOUBLES.find(PREDICATE);
  },
  'objects'() {
    VALUES_OBJS.find(PREDICATE);
  },

  'smis-index'() {
    VALUES_SMIS.findIndex(PREDICATE);
  },
  'doubles-index'() {
    VALUES_DOUBLES.findIndex(PREDICATE);
  },
  'objects-index'() {
    VALUES_OBJS.findIndex(PREDICATE);
  },
}

const variantName = arguments[1];
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
