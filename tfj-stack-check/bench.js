'use strict';

const VARIANTS = {
  'noop': () => String.noop(),
  'noopAdapt': () => String.noopAdapt(100),
};

const variantName = arguments[0];
const variant = VARIANTS[variantName];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

function bench(iters) {
  let result;
  for (let iter = 0; iter < iters; iter++) {
    result = variant(iter);
  }
}

const start = performance.now();
bench(1e7);
console.log(performance.now() - start);
