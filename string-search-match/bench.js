'use strict';

const STRINGS = [
  "a",
  "ab",
  "abc",
  "abcd",
  "abcde",
  "abcdef",
  "abcdefg",
  "abcdefgh",
  "abcdefghi",
  "abcdefghij",
  "abcdefghijk",
  "abcdefghijkl",
  "abcdefghijklm",
  "abcdefghijklmn",
  "abcdefghijklmno",
  "abcdefghijklmnop",
  "abcdefghijklmnopq"
];

const PATTERN_STRINGS = [
  "a",
  "b",
  "c",
  "bc",
  "cd",
  "d.*",
  "e.*",
  "d.*(fgh|ghi|hijijk)$"
];

const PATTERN_REGEXES = [
  /a/,
  /b/,
  /c/,
  /bc/,
  /cd/,
  /d.*/,
  /e.*/,
  /d.*(fgh|ghi|hijijk)$/
];

const func = (funcName => {
  switch (funcName) {
    case 'match':
      return (string, pattern) => {
        const result = string.match(pattern);
        return result === null ? 0 : result[0].length;
      };
    case 'search':
      return (string, pattern) => string.search(pattern);
    default:
      throw new Error(`Unknown function ${funcName}, expected 'match' or 'search'`);
  }
})(arguments[0]);

const patterns = (mode => {
  switch (mode) {
    case 'string': return PATTERN_STRINGS;
    case 'regex': return PATTERN_REGEXES;
    case 'both': return [...PATTERN_STRINGS, ...PATTERN_REGEXES];
    default: throw new Error(`Unknown mode ${mode}, expected 'string', 'regex', or 'both'`);
  }
})(arguments[1]);

function test() {
  let result = 0;
  for (const string of STRINGS) {
    for (const pattern of patterns) {
      result += func(string, pattern);
    }
  }
  return result;
}

function bench(iters) {
  for (let iter = 0; iter < iters; iter++) {
    test();
  }
}

// Warmup
bench(2);

// Bench
const start = Date.now();
bench(1e5);
console.log(Date.now() - start);
