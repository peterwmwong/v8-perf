'use strict';

const ITERATIONS = 1e4;
const LENGTH = arguments[0];

const dest_arrays = [
  new Uint8Array(LENGTH),
  new Int8Array(LENGTH),
  new Uint16Array(LENGTH),
  new Int16Array(LENGTH),
  new Uint32Array(LENGTH),
  new Int32Array(LENGTH),
  new Float32Array(LENGTH),
  new Float64Array(LENGTH),
  new Uint8ClampedArray(LENGTH)
];

const uint8_array = new Uint8Array(LENGTH);
const int32_array = new Int32Array(LENGTH);
const float32_array = new Float32Array(LENGTH);
const float64_array = new Float64Array(LENGTH);
for (let i = 0; i < LENGTH; i++) {
  uint8_array[i] = i;
  int32_array[i] = i;
  float32_array[i] = i;
  float64_array[i] = i;
}

const start = performance.now();
for (let iter = 0; iter < ITERATIONS; iter++) {
  for(const typed_dest of dest_arrays) {
    typed_dest.set(uint8_array);
    typed_dest.set(int32_array);
    typed_dest.set(float32_array);
    typed_dest.set(float64_array);
  }
}
console.log(performance.now() - start);
