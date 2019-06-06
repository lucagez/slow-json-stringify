import { _deepPath, _validator, _scv } from './_utils';

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

      _validator(value);

      map[prop] = _deepPath(schema, prop);
      props += `"${prop}"|`;
    }
    return value;
  });

  return { map, arrais, props, str, queue: _scv(schema, ['string', 'number', 'boolean', 'array']) };
};
