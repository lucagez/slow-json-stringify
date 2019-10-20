/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
*/
const Benchmark = require('benchmark');

const fjs = require('fast-json-stringify');
const { sjs, attr  } = require('../dist/sjs');

const suite = new Benchmark.Suite;

// Building huge array with short properties
const obj = {
  hello: 'pretty big object here',
  test: Array(1000).fill(0).map(() => ({
    a: Math.random() * 12345678901412341,
    b: Math.random() * 12345678901412341,
    c: Math.random() * 12345678901412341,
  })),
};


// Slow-json-stringify schema
const slowStringify = sjs({
  hello: attr('string'),
  test: attr('array', sjs({
    a: attr('number'),
    b: attr('number'),
    c: attr('number'),
  })),
});

const res = [];

const percentageDiff = (arr) => {
  const use = arr.sort((a, b) => b - a);
  return (use[0] - use[1]) / use[1] * 100;
};

console.log('```bash');

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

// `SJS` 2x faster than native

// native x 950 ops/sec ±1.07% (89 runs sampled)
// fast-json-stringify N/A => dynamic arrais not supported
// slow-json-stringify x 1,944 ops/sec ±2.78% (90 runs sampled)


