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
    a: Math.random().toString(36),
    b: Math.random().toString(36),
    c: Math.random().toString(36),
  })),
};


// Slow-json-stringify schema
const slowStringify = sjs({
  hello: 'string',
  test: [sjs({
    a: 'string',
    b: 'string',
    c: 'string',
  })],
});

// console.log(slowStringify(obj));
suite
  .add('native', () => JSON.stringify(obj))
  .add('slow-json-stringify', () => slowStringify(obj))
  .on('cycle', (event) => console.log(String(event.target)))
  .run();

// `SJS` only slightly faster => not worth it for this use case.

// native x 3,351 ops/sec ±0.81% (85 runs sampled)
// fast-json-stringify N/A => dynamic arrais not supported
// slow-json-stringify x 3,528 ops/sec ±2.86% (89 runs sampled)


