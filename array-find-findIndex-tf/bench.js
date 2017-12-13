'use strict';

const length = +arguments[0];

const smiEntry = (v, i) => i;
const doubleEntry = (v, i) => i + 0.5;
const objectEntry = (v, i, a) => ({});
const reduceEntry = makeEntryFunc =>
  (arr, v, i, a) => {
    arr.push(makeEntryFunc(v, i, a));
    return arr;
  }

const PACKED_SMIS = Array.from({ length }).reduce(reduceEntry(smiEntry), []);
const PACKED_DOUBLES = Array.from({ length }).reduce(reduceEntry(doubleEntry), []);
const PACKED_OBJS = Array.from({ length }).reduce(reduceEntry(objectEntry), []);

// console.log(PACKED_SMIS);
// console.log(PACKED_DOUBLES);
// console.log(PACKED_OBJS);
// console.log(%HasHoleyElements(PACKED_SMIS));
// console.log(%HasHoleyElements(PACKED_DOUBLES));
// console.log(%HasHoleyElements(PACKED_OBJS));

const HOLEY_SMIS = Array.from({ length }, smiEntry);
const HOLEY_DOUBLES = Array.from({ length }, doubleEntry);
const HOLEY_OBJS = Array.from({ length }, objectEntry);

// console.log(HOLEY_SMIS);
// console.log(HOLEY_DOUBLES);
// console.log(HOLEY_OBJS);
// console.log(%HasHoleyElements(HOLEY_SMIS));
// console.log(%HasHoleyElements(HOLEY_DOUBLES));
// console.log(%HasHoleyElements(HOLEY_OBJS));

const predicate = (v, i, a) => v === a[a.length - 1];
const findIndexFunc = arr => arr.findIndex(predicate);

const VARIANTS = {
  'smis': {
    array: PACKED_SMIS,
    func: findIndexFunc
  },
  'doubles': {
    array: PACKED_DOUBLES,
    func: findIndexFunc
  },
  'objects': {
    array: PACKED_OBJS,
    func: findIndexFunc
  },
  'smis-holey': {
    array: HOLEY_SMIS,
    func: findIndexFunc
  },
  'doubles-holey': {
    array: HOLEY_DOUBLES,
    func: findIndexFunc
  },
  'objects-holey': {
    array: HOLEY_OBJS,
    func: findIndexFunc
  },
}

const variantName = arguments[1];
const variant = VARIANTS[variantName];
if (variant === undefined) {
  throw new Error(`Unknown variant ${variantName}, expected ${Object.keys(VARIANTS).join(', ')}`);
}

const { func, array } = variant;
const start = performance.now();
let result;
for (let iter = 0; iter < 1e5; iter++) {
  result = func(array);
}
console.log(performance.now() - start);
