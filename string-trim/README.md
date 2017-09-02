## Benchmark: `string-trim.js`

```js
'use strict';

const STRINGS = [
  "Lorem",
  "\n\n \n  \n\t\nipsum\n \t\n \t",
  "\t\n\n\n\t\t dolor \t\t \n\n\t\n",
  " \t \t \tsit\t\t",
  " \namet\t    \t\t \n",
  " \n\t \nconsectetur   \n \n\n",
  "\n adipiscing",
  "\n \n\t \t elit\n \n\t",
  "sed\n\t\n\t  \t",
  "\n \n\tdo",
  " \t\t  eiusmod  \n ",
  "\ntempor\n\t\t\n\t  \t",
  "\n \n\n\t\t\t \tincididunt",
  " \t\t\n\t\tut",
  " \n \nlabore  ",
  "\t\n et \t\t  \n\n \n",
  "\t\t\n \ndolore\t",
  " \t\t\n   magna\n \n\n",
  "\t \taliqua\t",
  "\t\t\n\n\n\t \tUt  \n\t \t",
  " \n   \n\n\nLorem",
  "\n \t\n\tipsum",
  "dolor   \t\t\n\t\n",
  "\tsit  \t\t",
  " \n\n\t\n\n amet ",
  "consectetur\n\t\t",
  "adipiscing \n\t ",
  " \n\telit \t\n \n",
  " \t \t\tsed\t\t  \t\t\n",
  " \n\n  \t  do \t\t\t\t \n ",
  "\t\t\teiusmod\n",
  "\ttempor\t\t\n\t\n",
  " \t\t incididunt",
  "   \t\n\n\t\n\tut \t \n\n",
  "\nlabore",
  "et  ",
  "  \n \n\tdolore\n \n \n  ",
  "\n\t \t  magna \t\n\n\t",
  "\t  aliqua\n\n",
  "\n\t Ut\t\t\t   "
];

const trimFunc = {
  trim: s => s.trim(),
  trimLeft: s => s.trimLeft(),
  trimRight: s => s.trimRight()
}[arguments[0]];

function bench(){
  let result = 0;
  for (let x = 0; x < 1e6; x++) {
    for (let i = 0; i < STRINGS.length; i++) {
      result += trimFunc(STRINGS[i]).length;
    }
  }
  return result;
}

const start = Date.now();
bench();
console.log(Date.now() - start);

```

## Results

| Method | Before | After | Improvement |
|--------|--------|-------|-------------|
| trim | 3093.80ms | 1077.25ms | 2.87x |
| trimLeft | 2521.70ms | 852.00ms | 2.96x |
| trimRight | 2280.80ms | 835.35ms | 2.73x |
