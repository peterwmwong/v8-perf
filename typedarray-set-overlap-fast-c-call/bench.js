'use strict';

const ITERATIONS = 1e4;
const VARIANT_NAME = arguments[1];
const LENGTH = arguments[0];
const HALF_LENGTH = (LENGTH / 2) | 0;
const QUARTER_LENGTH = (LENGTH / 4) | 0;

/*
0, 1, 2, ..., 127, 0, 1, 2, ...
*/
const createBuffer = length => {
  const buf = new ArrayBuffer(length);
  new Int8Array(buf).set(Array.from({ length }, (_, i) => i % 128));
  return buf;
};
const ARRAY_BUFFER = createBuffer(LENGTH);

const VARIANTS = {
  /*
  0 1 2 3
  0   1   2   3
  */
  leftOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, 0, HALF_LENGTH),
    target: new Int16Array(ARRAY_BUFFER, 0, HALF_LENGTH)
  }),

  /*
          4 5 6 7
  0   1   2   3
  */
  rightOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, HALF_LENGTH, HALF_LENGTH),
    target: new Int16Array(ARRAY_BUFFER, 0, HALF_LENGTH)
  }),

  /*
      2 3 4 5
  0   1   2   3
  */
  midOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, QUARTER_LENGTH, HALF_LENGTH),
    target: new Int16Array(ARRAY_BUFFER, 0, HALF_LENGTH)
  }),

 nonOverlap: () => ({
    source: new Int8Array(ARRAY_BUFFER, 0, HALF_LENGTH),
    target: new Int16Array(createBuffer(LENGTH))
  })
};

const variant = VARIANTS[VARIANT_NAME];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

// const debug = func => {
//   const { target, source } = func(createBuffer(LENGTH));
//   console.log(`${func.name}`);
//   console.log('before:', source, target);
//   target.set(source);
//   console.log('after:', source, target);
// }
// debug(variant);

const { source, target } = variant();
const start = performance.now();
for (let iter = 0; iter < ITERATIONS; iter++) {
  target.set(source);
}
console.log(performance.now() - start);
