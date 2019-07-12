

const _find = (path) => {
  const { length } = path;

  let str = 'obj';

  for (let i = 0; i < length; i++) {
    str = str.replace(/^/, '(');
    str += ` || {}).${path[i]}`;
  }

  return eval(`((obj) => ${str})`);
};

const _makeArr = (array, method) => {
  if (method === 'array-simple') return JSON.stringify(array);

  // Stringifying more complex array using the provided sjs schema
  let acc = '';
  const { length } = array;
  for (let i = 0; i < length - 1; i++) {
    acc += `${method(array[i])},`;
  }

  // Prevent slice for removing unnecessary comma.
  acc += method(array[length - 1]);

  return `[${acc}]`;
};

const _validator = (value) => {
  // Declaring allowed types.
  const allowedTypes = new Set([
    'number',
    'string',
    'boolean',
    'undefined',
    'array-simple',
    'function',
  ]);

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

const defaultRegex = new RegExp('\\n|\\r|\\t|\\"|\\\\', 'gm');
const escape = (regex = defaultRegex) => str => str.replace(regex, char => '\\' + char);

export {
  _find,
  _makeArr,
  _validator,
  escape,
};
