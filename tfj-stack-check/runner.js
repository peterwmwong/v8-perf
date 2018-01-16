const { execSync } = require('child_process');

const [,, BEFORE_D8, AFTER_D8] = process.argv;
const ITERATIONS = 100;
const VARIANTS = [
  {
    variant: 'noop',
    name: 'String.noop()'
  },
  {
    variant: 'noopAdapt',
    name: 'String.noopAdapt(100)'
  },
];

const runBench = (d8Binary, variant) => {
  const result = +execSync(`
    for i in {1..${ITERATIONS}}; do
      ${d8Binary} ./bench.js -- ${variant};
    done | awk '{ total += $1 } END { print total/NR }'
  `);
  return result.toFixed(2);
};

console.log(`\n    > # Usage: node runner.js [BEFORE_D8] [AFTER_D8]`);
console.log(`    > node runner.js ${BEFORE_D8} ${AFTER_D8}\n`);
console.log('## Results\n');
console.log('| Method   | Before (ms)   | After (ms)   | Improvement |');
console.log('|----------|---------------|--------------|-------------|');

for (const { variant, name } of VARIANTS) {
  const after = runBench(AFTER_D8, variant);
  const before = runBench(BEFORE_D8, variant);
  const improvement = (before / after).toFixed(2);

  console.log(`| ${name} | ${before} | ${after} | ${improvement} |`);
}
