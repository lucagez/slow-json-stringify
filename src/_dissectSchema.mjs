import { _deepPath } from './_utils';

const validator = (value) => {
  // Declaring allowed types.
  const allowedTypes = new Set(['number', 'string', 'boolean', 'array-simple', 'function']);

  if (Array.isArray(value)) {
    if (allowedTypes.has(value[0]) || allowedTypes.has(typeof value[0])) return;

    // Throwing if inside array is found anything else than "array-simple" or new sjs schema
    throw new Error(`Expected either "array-simple" or a function. received ${value}`);
  } else if (typeof value !== 'function' && !allowedTypes.has(value)) {
    // Throwing on illegal types
    // => Mainly protecting users from typo.
    throw new Error(`Expected one of: "number", "string", "boolean". received ${value}`);
  }
};

export default (schema) => {
  // `map` will keep track of the paths of every nested prop
  const map = {};

  // `arrais` keep track of array properties and the method to be used when stringifying.
  const arrais = new Map();

  // Accumulator of every prop present in the schema
  // => Used later to build a regex useful for queueing insertions.
  let props = '';

  // `str` in the end is simply the native stringification of schema.
  // => JSON.stringify is used only for convenience.
  const str = JSON.stringify(schema, (prop, value) => {
    const isArray = Array.isArray(value);
    if (typeof value !== 'object' || isArray) {
      if (isArray) {
        const current = value[0];
        arrais.set(prop, current);
      }

      validator(value);

      map[prop] = _deepPath(schema, prop);
      props += `"${prop}"|`;
    }
    return value;
  });

  return { map, arrais, props, str };
};
