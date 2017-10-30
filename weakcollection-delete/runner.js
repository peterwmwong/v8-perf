const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const drawBarChart = require('../drawChart');

const BEFORE_D8 = '/p/google2/v8/out.gn/x64.release/d8';
const AFTER_D8 = '/p/google/v8/out.gn/x64.release/d8';
const BENCH_JS = 'bench.js';
const ITERATIONS = 20;

console.log(`## Benchmark: \`${BENCH_JS}\`

\`\`\`js
${readFileSync(`${__dirname}/${BENCH_JS}`)}
\`\`\`
`)

console.log('## Results\n');
const runBench = (d8Binary, args, variant) => {
  const result = +execSync(`
    for i in {1..${ITERATIONS}}; do
      ${d8Binary} ${__dirname}/${BENCH_JS} ${args} -- ${variant};
    done | st --mean
  `);
  return result.toFixed(2);
};

console.log('|        |  Method  | Before | After | Improvement |');
console.log('|--------|----------|--------|-------|-------------|');

const VARIANTS = {
  'WeakMap-delete': 'WeakMap.delete(key)',
  'WeakSet-delete': 'WeakSet.delete(key)',
  'WeakMap-delete-nonmember': 'WeakMap.delete(nonMemberKey)',
  'WeakSet-delete-nonmember': 'WeakSet.delete(nonMemberKey)'
}

const ARGS = [
  '--noopt',
  ''
];

const results = [];
for (const arg of ARGS) {
  for (const variant of Object.keys(VARIANTS)) {
    const after = runBench(AFTER_D8, arg, variant);
    const before = runBench(BEFORE_D8, arg, variant);
    console.log(`| ${arg} | ${VARIANTS[variant]} | ${before}ms | ${after}ms | ${(before / after).toFixed(2)}x |`);
    results.push({
      arg,
      variant,
      name: VARIANTS[variant],
      before,
      after
    });
  }
}

drawBarChart(results);
