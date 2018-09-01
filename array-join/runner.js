const { execSync } = require('child_process');
const ss = require('simple-statistics');

const BEFORE_D8 = '/p/google2/v8/out.gn/x64.release/d8';
const AFTER_D8 = '/p/google/v8/out.gn/x64.release/d8';
const BENCH_JS = 'bench.js';

const doExceSync = cmd => execSync(cmd);
const MIN_SAMPLES = 100;
const MAX_SAMPLES = 1000;
const MAX_DEV_PCT = 0.05;
const ROUND_MASK = 10**3
const round = (v) => ((v * ROUND_MASK)|0) / ROUND_MASK;

const runBench = (d8Binary, ...args) => {
  try {
    const results = [];
    let stddev = 0;
    let mean = 0;
    while (
      results.length < MIN_SAMPLES ||
      (
        ((2 * stddev) > (mean * MAX_DEV_PCT)) &&
        results.length < MAX_SAMPLES
      )
    ) {
      const result = +('' + doExceSync(`${d8Binary} ${__dirname}/${BENCH_JS} -- ${args.join(' ')};`)).trim();
      results.push(result);
      stddev = ss.medianAbsoluteDeviation(results);
      mean = ss.mean(results);
    }
    return {stddev, mean, samples: results.length};
  } catch(e) {
    console.log(e.stdout.toString());
  }
};

const SETUP_VARIANTS = [
  'smi',
  'string',
  // TODO(pwong): Add 'stringTwoByte',
  'double',
  'object',
  'sparseSmi',
  'sparseString'
];

const VARIANTS = [
  'join',
  'joinSep',
  // TODO(pwong): Add 'joinSepMultiChar'
  // TODO(pwong): Add 'joinSepTwoByte',
  'joinSepMultiChar'
];

const ARRAY_SIZES = [
  1,
  2,
  4,
  8,
  32,
  64,
  128,
  256,
  512,
  1024
  // TODO(pwong): go higher
  // TODO(pwong): Add setup that actually triggers
  //              **the sparse optimization** T_T :) XD
];

const allResults = [];
let headerRow = null;
for (const warmup of ['no-warmup'/*, 'with-warmup'*/]) {
  for (const variant of VARIANTS) {
    for (const arraySize of ARRAY_SIZES) {
      const results = [];
      for (const setupVariant of SETUP_VARIANTS) {
        const args = [warmup, setupVariant, variant, arraySize];
        const before = runBench(BEFORE_D8, ...args);
        const after = runBench(AFTER_D8, ...args);
        const result = {
          setupVariant,
          'delta': (before.mean / after.mean),

          'before-mean': before.mean,
          'after-mean': after.mean,

          'after-stddev': after.stddev,
          'before-stddev': before.stddev,

          'after-samples': after.samples,
          'before-samples': before.samples,
        };
        // console.log(JSON.stringify(result));
        results.push(result);
      }
      const row = [
        {label: 'array size', value: arraySize},
        ...results.map(r => ({label: `${r.setupVariant}-delta`, value: round(r.delta)})),
      ];

      results.forEach(r => {
        [
          'before-mean',
          'after-mean',
          'before-stddev',
          'after-stddev',
          'before-samples',
          'after-samples',
        ].forEach(prop => {
          row.push({label: `${r.setupVariant} ${prop}`, value: round(r[prop])});
        });
      })
      if (headerRow === null) {
        headerRow = row.map(col => col.label).join(',');
        console.log(headerRow);
      }
      console.log(row.map(col => col.value).join(','));
    }
  }
}
