const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const drawBarChart = require('../drawChart');

const BEFORE_D8 = '/p/google4/v8/out.gn/x64.release/d8';
const AFTER_D8 = '/p/google/v8/out.gn/x64.release/d8';
const BENCH_JS = 'bench.js';
const ITERATIONS = 40;

console.log(`## Benchmark: \`${BENCH_JS}\`

\`\`\`js
${readFileSync(`${__dirname}/${BENCH_JS}`)}
\`\`\`
`)

console.log('## Results\n');
const runBench = (d8Binary, d8arg, arraySize, variant) => {
  const result = +execSync(`
    for i in {1..${ITERATIONS}}; do
      ${d8Binary} ${__dirname}/${BENCH_JS} ${d8arg} -- ${arraySize} ${variant};
    done | st --mean
  `);
  return result.toFixed(2);
};

console.log('| Array size |  Method  | Before | After | Improvement |');
console.log('|------------|----------|--------|-------|-------------|');

const VARIANTS = {
  'smis': 'array of Smis',
  'doubles': 'array of Doubles',
  'objects': 'array of Objects',
  'smis-holey': 'holey array of Smis',
  'doubles-holey': 'holey array of Doubles',
  'objects-holey': 'holey array of Objects',
};

const ARRAY_SIZE = [
  1,
  8,
  16,
  32
];

const results = [];
for (const d8arg of ['']) {
  for (const arraySize of ARRAY_SIZE) {
    for (const variant of Object.keys(VARIANTS)) {
      const after = runBench(AFTER_D8, d8arg, arraySize, variant);
      const before = runBench(BEFORE_D8, d8arg, arraySize, variant);

      console.log(`| ${arraySize} | ${VARIANTS[variant]} | ${before}ms | ${after}ms | ${(before / after).toFixed(2)}x |`);
      results.push({
        d8arg,
        arraySize,
        variant,
        name: VARIANTS[variant],
        before,
        after
      });
    }
  }
}

drawBarChart(results);
