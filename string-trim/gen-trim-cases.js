const WHITESPACE_CHARS = [
  ' ',
  '\t',
  '\n'
]

const genWhitespace = () =>
  WHITESPACE_CHARS[Math.random() * WHITESPACE_CHARS.length | 0];

const genWhitespaces = () => {
  const num = Math.random() * 10 | 0;
  let result = '';
  for (let i = 0; i < num; i++) {
    result += genWhitespace();
  }
  return result;
}

console.log(JSON.stringify([
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'Ut',
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'Ut',
].map(s => `${genWhitespaces()}${s}${genWhitespaces()}`), null, 2));
