/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
 * 
 * Testing for undefined properties.
*/
const Benchmark = require('benchmark');

const fjs = require('fast-json-stringify');
const { sjs, attr } = require('../dist/sjs');

const suite = new Benchmark.Suite;

const obj = { hello: 'world', gino: 'The answer is 42', jimmy: undefined };

// Fast-json-stringify schema
const fastStringify = fjs({
  type: 'object',
  properties: {
    hello: {
      type: 'string',
    },
    gino: {
      type: 'string',
    },
    jimmy: {
      type: 'string',
    },
  },
});

// Slow-json-stringify schema
const slowStringify = sjs({
  hello: attr('string'),
  jimmy: attr('string'),
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
