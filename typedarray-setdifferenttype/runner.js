const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const drawBarChart = require('../drawChart');
const ss = require('simple-statistics');

const BEFORE_D8 = '/p/google2/v8/out.gn/x64.release/d8';
const AFTER_D8 = '/p/google3/v8/out.gn/x64.release/d8';
const BENCH_JS = 'bench.js';
const ITERATIONS = 40;

console.log(`## Benchmark: \`${BENCH_JS}\`

\`\`\`js
${readFileSync(`${__dirname}/${BENCH_JS}`)}
\`\`\`
`);

console.log('## Results\n');
const runBench = (d8Binary, args) => {
  const result = '' + execSync(`
    for i in {1..${ITERATIONS}}; do
      ${d8Binary} ${__dirname}/${BENCH_JS} -- ${args};
    done
  `);

  const results = result.split('\n');
  return ss.median(results.map(v => +v)).toFixed(2);
};

console.log('|  Size  | Before | After | Improvement |');
console.log('|--------|--------|-------|-------------|');

const ARGS = [
  1,
  16,
  32,
];

const results = [];
for (const arg of ARGS) {
  const before = runBench(BEFORE_D8, arg);
  const after = runBench(AFTER_D8, arg);
  console.log(`| ${arg} | ${before}ms | ${after}ms | ${(before / after).toFixed(2)}x |`);
  results.push({
    arg,
    variant: "different type",
    name: `${arg}`,
    before,
    after
  });
}

drawBarChart(results);
