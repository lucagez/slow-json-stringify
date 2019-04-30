const sjs = require('../dist/sjs');

const stringify = sjs({
  a: 'string',
  b: 'number',
});

const str = stringify({
  a: 'ciao',
  b: 345
});

console.log(str);
console.log(JSON.parse(str));