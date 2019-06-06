// Recursively building an array containing the path of a property in an object.
// => e.g.
//      const test = {
//        a: {
//          b: {
//            c: 'test'
//          }
//        }
//      }
//      deepPath(test, 'c') // ['a', 'b', 'c']
const _deepPath = (obj, target) => {
  for (const key in obj) {
    if (key === target) return [key];
    if (obj[key] && typeof obj[key] === 'object') {
      const result = _deepPath(obj[key], target);
      if (result) {
        result.unshift(key);
        return result;
      }
    }
  }
};

// Reducing object to final value
const _deepFind = (obj, path) => path.reduce((a, b) => a && a[b], obj);

const _makeArr = (array, method) => {
  if (method === 'array-simple') return JSON.stringify(array);

  // Stringifying more complex array using the provided sjs schema
  let acc = '';
  for (const a of array) {
    acc += method(a) + ',';
  }

  // Removing last comma.
  return '[' + acc.substr(0, acc.length - 1) + ']';
};

const _validator = (value) => {
  // Declaring allowed types.
  const allowedTypes = new Set(['number', 'string', 'boolean', 'undefined', 'array-simple', 'function']);

  if (Array.isArray(value)) {
    if (allowedTypes.has(value[0]) || allowedTypes.has(typeof value[0])) return;

    // Throwing if inside array is found anything else than "array-simple" or new sjs schema
    throw new Error(`Expected either "array-simple" or a function. received ${value}`);
  } else if (typeof value !== 'function' && !allowedTypes.has(value)) {
    // Throwing on illegal types
    // => Mainly protecting users from typo.
    throw new Error(`Expected one of: "number", "string", "boolean", "undefined". received ${value}`);
  }
};

// Little utility for escaping convenience.
// => if no regex is provided, a default one will be used.
const escape = (regex) => {
  const usedRegex = regex || new RegExp('\\n|\\r|\\t|\\"|\\\\', 'gm');

  return str => str.replace(usedRegex, char => '\\' + char);
};

const _scv = (parentObj, allowed) => {
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
        path: [acc].flat(),
      });
      return;
    }

    // Recursively going deeper.
    // NOTE: While going deeper, the current prop is pushed into the accumulator
    // to keep track of the position inside of the object.
    return Object
      .keys(obj)
      .map(prop => scoped(obj[prop], [...acc, prop]));
  })(parentObj);

  return queue;
};

export {
  _deepPath,
  _deepFind,
  _makeArr,
  _validator,
  _scv,
  escape,
};
