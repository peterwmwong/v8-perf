## Benchmark: `bench.js`

```js
'use strict';
// const ITERATIONS = 1e2;
const ITERATIONS = 1;
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
    array.length = array.length * 16;
    return array;
  },
  sparseString() {
    const array = SETUP_VARIANTS.string();
    array.length = array.length * 16;
    return array;
  }
};

const VARIANTS = {
  join: array => array.join(),
  joinSep: array => array.join('|')
}

const array = SETUP_VARIANTS[SETUP_VARIANT_NAME]();
const func = VARIANTS[VARIANT_NAME];

let result = 0; // Defeat Escape Analysis
const bench = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    result = func(array);
  }
};

if (WITH_WARMUP) {
  bench();
  bench();
  bench();
}

const start = performance.now();
bench();
console.log(performance.now() - start);

```

## Results

|  Args  | Before | After | Improvement |
|--------|--------|-------|-------------|

  cmd: /p/google2/v8/out.gn/x64.release/d8 /Users/peter.wong/projects/v8-perf/array-join/bench.js -- no-warmup string join 1024;
  

  cmd: /p/google/v8/out.gn/x64.release/d8 /Users/peter.wong/projects/v8-perf/array-join/bench.js -- no-warmup string join 1024;
  
| no-warmup string join 1024 | NaNms | NaNms | NaNx |

  cmd: /p/google2/v8/out.gn/x64.release/d8 /Users/peter.wong/projects/v8-perf/array-join/bench.js -- with-warmup string join 1024;
  

  cmd: /p/google/v8/out.gn/x64.release/d8 /Users/peter.wong/projects/v8-perf/array-join/bench.js -- with-warmup string join 1024;
  
| with-warmup string join 1024 | NaNms | NaNms | NaNx |


![Results](https://image-charts.com/chart?cht=bhg&amp;chs=1024x4096&amp;chds=0,NaN&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;chma=10,50&amp;chtt=Time%20in%20ms%20(less%20is%20better)%20%5B*%20est%20startup%20perf%5D&amp;chdl=before|after&amp;chxl=0:|1:|no-warmup%20string%20join%201024*|with-warmup%20string%20join%201024*&amp;chd=t:NaN,NaN|NaN,NaN,_ "Results")
