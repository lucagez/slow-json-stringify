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
  I: {
    see: {
      trees: 'of green',
    },
  },
  red: {
    roses: 'too, I see',
  },
  them: {
    bloom: 'for me and you'
  }
};

// Fast-json-stringify schema
const fastStringify = fjs({
  type: 'object',
  properties: {
    I: {
      type: 'object',
      properties: {
        see: {
          type: 'object',
          properties: {
            trees: {
              type: 'string',
            },
          },
        },
      },
    },
    red: {
      type: 'object',
      properties: {
        roses: {
          type: 'string',
        },
      },
    },
    them: {
      type: 'object',
      properties: {
        bloom: {
          type: 'string',
        },
      },
    },
  },
});

// Slow-json-stringify schema
const slowStringify = sjs({
  I: {
    see: {
      trees: attr('string'),
    },
  },
  red: {
    roses: attr('string'),
  },
  them: {
    bloom: attr('string'),
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

// `SJS` is faster on nested properties and short text

// native x 911,912 ops/sec ±1.67% (86 runs sampled)
// fast-json-stringify x 3,337,796 ops/sec ±1.62% (87 runs sampled)
// slow-json-stringify x 4,636,561 ops/sec ±3.18% (88 runs sampled)

