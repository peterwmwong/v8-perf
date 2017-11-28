'use strict';

const LENGTH = +arguments[0];
const VALUES = Array.from({ length: LENGTH }, (_, i) => i);

const TYPED_ARRAY_CONSTRUCTORS = {
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
};

const variantName = arguments[1];
const taConstructor = TYPED_ARRAY_CONSTRUCTORS[variantName];
if (taConstructor === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(TYPED_ARRAY_CONSTRUCTORS).join(', ')}`);
}

const ta = new taConstructor(VALUES);
const findFunc = (_, i) => i === (LENGTH >> 1);

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    ta.findIndex(findFunc);
  }
}

const start = performance.now();
bench(1e4);
console.log(performance.now() - start);
