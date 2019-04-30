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

export {
  _deepPath,
  _deepFind,
  _makeArr,
};
