/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
*/
const Benchmark = require('benchmark');

const fjs = require('fast-json-stringify');
const { sjs } = require('../dist/sjs');

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
  hello: 'string',
  test: [sjs({
    a: 'number',
    b: 'number',
    c: 'number',
  })],
});

console.log(slowStringify(obj));
suite
  .add('native', () => JSON.stringify(obj))
  .add('slow-json-stringify', () => slowStringify(obj))
  .on('cycle', (event) => console.log(String(event.target)))
  .run();

// `SJS` 2x faster than native

// native x 950 ops/sec ±1.07% (89 runs sampled)
// fast-json-stringify N/A => dynamic arrais not supported
// slow-json-stringify x 1,944 ops/sec ±2.78% (90 runs sampled)


