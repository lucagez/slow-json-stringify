const { sjs } = require('../dist/sjs');

const stringify = sjs({
  a: 'string',
  b: 'number',
});

const str = 'dwejfoweijrfuiwehfjwheorifwefowehrfhweoriunfowieurfuhnweorunhfow"uenr  fwfjojerifwoiuenh£""rfojwneri"nwferfikjwnfjnerwojfnwejrncweojrcnwenojnojnjncsfojcvsdnfjvcnsdfjvnsfjicno';
const escaped = str.replace(/\n|\r|\t|\"|\\/gm, char => '\\' + char);

const escape = str => str.replace(/\n|\r|\t|\"|\\/gm, char => '\\' + char);

console.log(escaped);

const test = {
  // a: escaped,
  a: Date.now(),
  b: undefined
};

const benchFor = (func, args, n) => {
  const t0 = Date.now();
  for (let i = 0; i < n; ++i) {
    func(...args);
  }
  return Date.now() - t0;
};

const iter = 1000000;

const native = benchFor(JSON.stringify, [test], iter);
const sjsTest = benchFor(stringify, [test], iter);
// const fastTest = benchFor(stringify, [testObj1], iter);
console.log(JSON.parse(stringify(test)))

console.log('native: ', native);
console.log('sjs: ', sjsTest);
