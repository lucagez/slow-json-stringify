const { sjs } = require('../dist/sjs');

const schema = {
  a: {
    b: {
      c: 'string',
    },
    d: {
      e: 'string',
      c: 'number',
      a: 'number',
      g: {
        f: {
          l: 'string',
          a: 'number',
        }
      }
    }
  },
  string: 'string',
  5: ['array-simple']
};

const test = {
  a: {
    b: {
      c: 'ciao',
    },
    d: {
      e: 'ciaone',
      c: 1,
      a: 12,
      g: {
        f: {
          l: 'lol',
          a: 25,
        }
      }
    }
  },
  string: 'bello',
  5: [1, 2, 3, 4, 5],
};

// const _deepFind = (obj, path) => path.reduce((a, b) => a && a[b], obj);
// console.log(_deepFind(schema, ['strin']))

const stringify = sjs(schema);

console.log(JSON.parse(stringify(test)));

// const isProp = types => prop => types.has(prop);
// const check = isProp(types);

const scv = (obj, allowed) => {
  const queue = [];

  // Storing the allowed types is useful to know if we are arrived at the deepest level.
  // If the current value is one of types => the accumulator is storing the path to reach the
  // target prop.
  const types = new Set(allowed);

  // Defining a function inside an other function is slow.
  // However it's OK for this use case as the queue creation is not time critical.
  (function scoped(obj, acc = []) {
    const isArray = Array.isArray(obj);
    if (types.has(obj) || isArray) {
      queue.push({
        // Storing iside a unique queue is the current prop is an array or not
        isArray,
        // If the current prop is an array, the array stringification method is stored too.
        // The method for the array stringification, in SJS, is always stored at 0 position.
        method: isArray && obj[0],

        // The accumulator is geting one level deeper on each recursive
        // iteration => flattening on each insertion.
        // Wrapping `acc` inside an array because, if the prop is found at top level,
        // a string is pushed inside the queue. Making it already an array will avoid
        // a type check during stringification as the `deepFind` function accepts an array
        // as argument.
        path: [acc].flat()
      });
      return;
    }

    // Recursively going deeper.
    // NOTE: While going deeper, the current prop is pushed into the accumulator
    // to keep track of the position inside of the object.
    return Object
      .keys(obj)
      .map(prop => scoped(obj[prop], [...acc, prop]));

  })(obj);

  return queue;
};

// const queue = scv(schema, ['string', 'number', 'boolean', 'array']);
// flatter(t);
// console.log(queue);

// JSON.stringify(schema, (key, value) => {
//   console.log(`${key} ${typeof value === 'string' ? value : ''}`);
//   return value;
// })

