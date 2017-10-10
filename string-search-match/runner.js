const { execSync } = require('child_process');
const { readFileSync } = require('fs');

const BEFORE_D8 = '/p/google2/v8/out.gn/x64.release/d8';
const AFTER_D8 = '/p/google/v8/out.gn/x64.release/d8';
const BENCH_JS = 'bench.js';
const ITERATIONS = 10;

console.log(`## Benchmark: \`${BENCH_JS}\`

\`\`\`js
${readFileSync(`${__dirname}/${BENCH_JS}`)}
\`\`\`
`)

console.log('## Results\n');
const runBench = (d8Binary, args, method, pattern) => {
  const result = +execSync(`
    for i in {1..${ITERATIONS}}; do
      ${d8Binary} ${__dirname}/${BENCH_JS} ${args} -- ${method} ${pattern};
    done | st --mean
  `);
  return result.toFixed(2);
};

console.log('|        |  Method  | Pattern | Before | After | Improvement |');
console.log('|--------|----------|---------|--------|-------|-------------|');

const METHODS = [
  'search',
  'match'
]

const PATTERNS = [
  'string',
  'regex',
  'both'
]

const ARGS = ['--noopt', ''];
// const ARGS = [''];
// const ARGS = ['--noopt'];

ARGS.forEach(args => {
  METHODS.forEach(method => {
    PATTERNS.forEach(pattern => {
      const before = runBench(BEFORE_D8, args, method, pattern);
      const after = runBench(AFTER_D8, args, method, pattern);
      console.log(`| ${args} | ${method} | ${pattern} | ${before}ms | ${after}ms | ${(before / after).toFixed(2)}x |`);
    });
  });
});

