/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
*/
const Benchmark = require('benchmark');

const fjs = require('fast-json-stringify');
const { sjs, attr } = require('../dist/sjs');

const suite = new Benchmark.Suite;

// Building huge array with short properties
const obj = {
  hello: 'pretty big object here',
  test: Array(1000).fill(0).map(() => ({
    a: Math.random().toString(36),
    b: Math.random().toString(36),
    c: Math.random().toString(36),
  })),
};


// Slow-json-stringify schema
const slowStringify = sjs({
  hello: attr('string'),
  test: attr('array', sjs({
    a: attr('string'),
    b: attr('string'),
    c: attr('string'),
  })),
});


const res = [];

const percentageDiff = (arr) => {
  const use = arr.sort((a, b) => b - a);
  return (use[0] - use[1]) / use[1] * 100;
};

console.log('```bash');

// console.log(slowStringify(obj));
suite
  .add('native', () => JSON.stringify(obj))
  .add('slow-json-stringify', () => slowStringify(obj))
  .on('cycle', (event) => {
    res.push(Math.floor(event.target.hz));
    console.log(String(event.target))
  })
  .on('complete', function () {
    const fastest = this.filter('fastest').map('name');
    console.log(`\n# ${fastest} is +${percentageDiff(res).toFixed(2)}% faster`);
    console.log('\n```\n');
  })
  .run();

// `SJS` only slightly faster => not worth it for this use case.

// native x 3,351 ops/sec ±0.81% (85 runs sampled)
// fast-json-stringify N/A => dynamic arrais not supported
// slow-json-stringify x 3,528 ops/sec ±2.86% (89 runs sampled)


