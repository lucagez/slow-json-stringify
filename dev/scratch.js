const { sjs, escape } = require('../dist/sjs');

const stringify = sjs({
  a: 'string',
  b: 'number',
  c: {
    a: 'string',
  }
});

const test = {
  // a: escaped,
  a: escape()('pappa\\perp'),
  b: undefined
};

console.log(escape()('pappa\\perp'));

const benchFor = (func, args, n) => {
  const t0 = Date.now();
  for (let i = 0; i < n; ++i) {
    func(...args);
  }
  return Date.now() - t0;
};

const iter = 1000000;

// const native = benchFor(JSON.stringify, [test], iter);
// const sjsTest = benchFor(stringify, [test], iter);
// // const fastTest = benchFor(stringify, [testObj1], iter);
// console.log(JSON.parse(stringify(test)))

// console.log('native: ', native);
// console.log('sjs: ', sjsTest);

console.log(stringify({
  a: 'hello',
  b: 23,
  c: {
    a: 'lol',
  }
}));
