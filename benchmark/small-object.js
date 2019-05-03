/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
*/
const Benchmark = require('benchmark');

const fjs = require('fast-json-stringify');
const { sjs } = require('../dist/sjs');

const suite = new Benchmark.Suite;

const obj = { hello: 'world' };

// Fast-json-stringify schema
const fastStringify = fjs({
  type: 'object',
  properties: {
    hello: {
      type: 'string',
    },
  },
});

// Slow-json-stringify schema
const slowStringify = sjs({
  hello: 'string',
});

suite
  .add('native', () => JSON.stringify(obj))
  .add('fast-json-stringify', () => fastStringify(obj))
  .add('slow-json-stringify', () => slowStringify(obj))
  .on('cycle', (event) => console.log(String(event.target)))
  .run();

// For small objects `fast-json-stringify` outperforms native.
// The increased performance using `SJS` is quite small.

// native x 2,854,971 ops/sec ±2.39% (83 runs sampled)
// fast-json-stringify x 18,085,743 ops/sec ±1.04% (88 runs sampled)
// slow-json-stringify x 21,193,276 ops/sec ±1.37% (89 runs sampled)
