/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
*/
const Benchmark = require('benchmark');

const fjs = require('fast-json-stringify');
const { sjs } = require('../dist/sjs');

const suite = new Benchmark.Suite;

// Building small array
const obj = {
  iris: Array(5).fill(0).map(() => ({
    sepalLength: (Math.random() * 1000).toFixed(3),
    sepalWidth: (Math.random() * 1000).toFixed(3),
    petalLength: (Math.random() * 1000).toFixed(3),
    petalWidth: (Math.random() * 1000).toFixed(3),
    species: 'setosa'
  })),
};

// Slow-json-stringify schema
const slowStringify = sjs({
  iris: [sjs({
    sepalLength: 'number',
    sepalWidth: 'number',
    petalLength: 'number',
    petalWidth: 'number',
    species: 'string'
  })],
});

// Fast-json-stringify schema
const fastStringify = fjs({
  type: 'object',
  properties: {
    iris: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            sepalLength: { type: 'number' },
            sepalWidth: { type: 'number' },
            petalLength: { type: 'number' },
            petalWidth: { type: 'number' },
            species: { type: 'string' },
          },
        }, {
          type: 'object',
          properties: {
            sepalLength: { type: 'number' },
            sepalWidth: { type: 'number' },
            petalLength: { type: 'number' },
            petalWidth: { type: 'number' },
            species: { type: 'string' },
          },
        }, {
          type: 'object',
          properties: {
            sepalLength: { type: 'number' },
            sepalWidth: { type: 'number' },
            petalLength: { type: 'number' },
            petalWidth: { type: 'number' },
            species: { type: 'string' },
          },
        }, {
          type: 'object',
          properties: {
            sepalLength: { type: 'number' },
            sepalWidth: { type: 'number' },
            petalLength: { type: 'number' },
            petalWidth: { type: 'number' },
            species: { type: 'string' },
          },
        }, {
          type: 'object',
          properties: {
            sepalLength: { type: 'number' },
            sepalWidth: { type: 'number' },
            petalLength: { type: 'number' },
            petalWidth: { type: 'number' },
            species: { type: 'string' },
          },
        },
      ],
    },
  },
});

const res = [];

const percentageDiff = (arr) => {
  const use = arr.sort((a, b) => b - a);
  return (use[0] - use[1]) / use[1] * 100;
};

console.log('```bash');

suite
  .add('native', () => JSON.stringify(obj))
  .add('fast-json-stringify', () => fastStringify(obj))
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

// In case of small arrais, `SJS` beats only slightly `fast-json`.
// The performance increase in respect to native stringify in very small.

// native x 320,376 ops/sec ±2.22% (86 runs sampled)
// fast-json-stringify x 396,477 ops/sec ±0.40% (91 runs sampled)
// slow-json-stringify x 402,391 ops/sec ±2.46% (89 runs sampled)

