const { sjs, attr, escape } = require('../dist/sjs');

const stringify = sjs({
  a: attr('string'),
  b: attr('null'),
  // c: {
  //   a: attr('array', sjs({
  //     l: 'string',
  //   })),
  // }
  c: attr('array'),
});

console.log(stringify({
  a: 'hello',
  b: null,
  c: {
    a: [{
      l: 'lol'
    }, {
      l: 'lolllp'
    }],
  }
}));
