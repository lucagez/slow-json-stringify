/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
*/
const Benchmark = require('benchmark');

const fjs = require('fast-json-stringify');
const { sjs, attr } = require('../dist/sjs');

const suite = new Benchmark.Suite;

// Lorem ipsum pretty long text
const obj = {
  I: 'see',
  trees: 'of grees',
  red: 'roses, too',
  I_see: 'them bloom',
  for: 'me and you',
  and: 'I think',
  to: 'myself',
  what: 'a wonderful World',

  the: 'colors',
  of: 'the rainbow',
  so: 'pretty',
  in: 'the sky',
  Are: 'also on the',
  faces: 'of people',
  going: 'by',
};

// Fast-json-stringify schema
const fastStringify = fjs({
  type: 'object',
  properties: {
    I: { type: 'string' },
    trees: { type: 'string' },
    red: { type: 'string' },
    I_see: { type: 'string' },
    for: { type: 'string' },
    and: { type: 'string' },
    to: { type: 'string' },
    what: { type: 'string' },
    the: { type: 'string' },
    of: { type: 'string' },
    so: { type: 'string' },
    in: { type: 'string' },
    Are: { type: 'string' },
    faces: { type: 'string' },
    going: { type: 'string' },
  },
});

// Slow-json-stringify schema
const slowStringify = sjs({
  I: attr('string'),
  trees: attr('string'),
  red: attr('string'),
  I_see: attr('string'),
  for: attr('string'),
  and: attr('string'),
  to: attr('string'),
  what: attr('string'),
  the: attr('string'),
  of: attr('string'),
  so: attr('string'),
  in: attr('string'),
  Are: attr('string'),
  faces: attr('string'),
  going: attr('string'),
});

const res = [];

const percentageDiff = (arr) => {
  const use = arr.sort((a, b) => b - a);
  return (use[0] - use[1]) / use[1] * 100;
};

console.log('```bash');

suite
  .add('native', () => JSON.stringify(obj))
  .add('slow-json-stringify-flatten', () => slowStringify(obj, true))
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

// `SJS` is faster on more properties and short text

// native x 703,142 ops/sec ±2.04% (84 runs sampled)
// fast-json-stringify x 843,441 ops/sec ±2.81% (87 runs sampled)
// slow-json-stringify x 1,150,923 ops/sec ±1.20% (84 runs sampled)



