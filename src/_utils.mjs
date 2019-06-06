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

export {
  _deepFind,
  _makeArr,
  _validator,
  escape,
};
