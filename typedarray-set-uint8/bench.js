'use strict';

const LENGTH = 1024 * 10;
const VALUES = Array.from({ length: LENGTH }, (_, i) => i % 128);

const target = new Uint8Array(VALUES);
const source = new Uint8ClampedArray(VALUES);

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    target.set(source);
  }
}

const start = Date.now();
bench(1e4);
console.log(Date.now() - start);
