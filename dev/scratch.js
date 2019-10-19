const { sjs, attr, escape } = require('../dist/sjs');

const stringify = sjs({
  a: attr('string'),
  b: attr('number'),
  // c: {
  //   a: attr('array', sjs({
  //     l: 'string',
  //   })),
  // }
  c: attr('array'),
});

console.log(stringify({
  a: 'hello',
  b: 23,
  c: {
    a: [{
      l: 'lol'
    }, {
      l: 'lolllp'
    }],
  }
}));
