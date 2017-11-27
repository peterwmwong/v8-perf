'use strict';

const LENGTH = 1024 * 10;
const VALUES = Array.from({ length: LENGTH }, (_, i) => i % 128);

const ab = new ArrayBuffer(LENGTH);
new Int8Array(ab).set(VALUES);

const target = new Int8Array(ab, 0, LENGTH/2);
const source = new Int16Array(ab, LENGTH/4, LENGTH/4);

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    target.set(source);
  }
}

const start = Date.now();
bench(1e4);
console.log(Date.now() - start);
