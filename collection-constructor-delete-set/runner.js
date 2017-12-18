const { execSync } = require('child_process');

const [,, BEFORE_D8, AFTER_D8] = process.argv;
const ITERATIONS = 20;
const VARIANTS = [
  {
    variant: 'WeakMap-constructor',
    name: 'new WeakMap(keyValues)',
    benchFile: 'constructor.js'
  },
  {
    variant: 'WeakSet-constructor',
    name: 'new WeakSet(keys)',
    benchFile: 'constructor.js'
  },
  {
    variant: 'Map-constructor',
    name: 'new Map(keyValues)',
    benchFile: 'constructor.js'
  },
  {
    variant: 'Set-constructor',
    name: 'new Set(keys)',
    benchFile: 'constructor.js'
  },
  {
    variant: 'WeakMap-delete',
    name: 'weakMap.delete(key)',
    benchFile: 'delete.js'
  },
  {
    variant: 'WeakSet-delete',
    name: 'weakSet.delete(key)',
    benchFile: 'delete.js'
  },
  {
    variant: 'WeakMap-set',
    name: 'weakMap.set(key, value)',
    benchFile: 'set.js'
  },
  {
    variant: 'WeakSet-add',
    name: 'weakSet.add(key)',
    benchFile: 'set.js'
  }
];

const runBench = (d8Binary, benchFile, variant) => {
  const result = +execSync(`
    for i in {1..${ITERATIONS}}; do
      ${d8Binary} ./${benchFile} -- ${variant};
    done | awk '{ total += $1 } END { print total/NR }'
  `);
  return result.toFixed(2);
};

console.log(`\n    > # Usage: node runner.js [BEFORE_D8] [AFTER_D8]`);
console.log(`    > node runner.js ${BEFORE_D8} ${AFTER_D8}\n`);
console.log('## Results\n');
console.log('| Method   | Before (ms)   | After (ms)   | Improvement |');
console.log('|----------|---------------|--------------|-------------|');

for (const { variant, name, benchFile } of VARIANTS) {
  const after = runBench(AFTER_D8, benchFile, variant);
  const before = runBench(BEFORE_D8, benchFile, variant);
  const improvement = (before / after).toFixed(2);

  console.log(`| ${name} | ${before} | ${after} | ${improvement} |`);
}
