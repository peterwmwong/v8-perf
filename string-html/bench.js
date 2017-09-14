'use strict';

const STRINGS = [
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "Ut",
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "Ut"
];

const randomString = () => STRINGS[(Math.random() * STRINGS.length) | 0];

const htmlFuncName = arguments[0];
const needsArg = [
  'anchor',
  'fontcolor',
  'fontsize',
  'link'
].includes(htmlFuncName);

function bench(){
  let result = 0;
  for (let x = 0; x < 1e4; x++) {
    for (let i = 0; i < STRINGS.length; i++) {
      const str = STRINGS[i];
      if (needsArg) {
        result += str[htmlFuncName]().length;
      }
      else {
        result += str[htmlFuncName](randomString()).length;
      }
    }
  }
  return result;
}

const start = Date.now();
bench();
console.log(Date.now() - start);
