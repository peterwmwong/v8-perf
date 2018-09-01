'use strict';
const ITERATIONS = 1000;
// const ITERATIONS = 250;
const WITH_WARMUP = arguments[0] == 'with-warmup';
const SETUP_VARIANT_NAME = arguments[1];
const VARIANT_NAME = arguments[2];
const ARRAY_SIZE = +arguments[3];

class Obj {
  constructor(str) { this.str = str; }
  toString() { return this.str; }
}

const SETUP_VARIANTS = {
  smi() {
    const array = [];
    for (let i = 0; i < ARRAY_SIZE; ++i) array[i] = i;
    return array;
  },
  string() {
    const array = [];
    for (let i = 0; i < ARRAY_SIZE; ++i) array[i] = `Item no. ${i}`;
    return array;
  },
  double() {
    const array = [];
    for (let i = 0; i < ARRAY_SIZE; ++i) array[i] = i + 0.25;
    return array;
  },
  object() {
    const array = [];
    for (let i = 0; i < ARRAY_SIZE; ++i) array[i] = new Obj(`Item no. ${i}`);
    return array;
  },
  sparseSmi() {
    const array = SETUP_VARIANTS.smi();
    array.length = array.length * 2;
    return array;
  },
  sparseString() {
    const array = SETUP_VARIANTS.string();
    array.length = array.length * 2;
    return array;
  }
};

const VARIANTS = {
  join: array => array.join(),
  joinSep: array => array.join('-')
}

const array = SETUP_VARIANTS[SETUP_VARIANT_NAME]();
const func = VARIANTS[VARIANT_NAME];

let result = 0; // Defeat Escape Analysis
const bench = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    result = func(array);
  }
};

// TODO(pwong): This is meant to test when TF kicks in. We should use
// `--allow-natives-syntax` to more quickly/effeciently do this.
if (WITH_WARMUP) {
  bench();
  bench();
  bench();
}

const start = performance.now();
bench();
print(performance.now() - start);
