const { execSync } = require('child_process');
const { readFileSync } = require('fs');

const BEFORE_D8 = '/p/google2/v8/out.gn/x64.release/d8';
const AFTER_D8 = '/p/google/v8/out.gn/x64.release/d8';
const BENCH_JS = 'string-trim.js';
const ITERATIONS = 20;

console.log(`## Benchmark: \`${BENCH_JS}\`

\`\`\`js
${readFileSync(`${__dirname}/${BENCH_JS}`)}
\`\`\`
`)

console.log('## Results\n');
const runBench = (d8Binary, method) => {
  const result = +execSync(`
    for i in {1..${ITERATIONS}}; do
      ${d8Binary} ${__dirname}/${BENCH_JS} -- ${method};
    done | st --mean
  `);
  return result.toFixed(2);
};

console.log('| Method | Before | After | Improvement |');
console.log('|--------|--------|-------|-------------|');

['trim', 'trimLeft', 'trimRight'].forEach(method => {
  const before = runBench(BEFORE_D8, method);
  const after = runBench(AFTER_D8, method);
  console.log(`| ${method} | ${before}ms | ${after}ms | ${(before / after).toFixed(2)}x |`);
});

