import { _validator, _scv } from './_utils';

export default (schema) => {
  // `str` in the end is simply the native stringification of schema.
  // => JSON.stringify is used only for convenience.
  const str = JSON.stringify(schema, (prop, value) => {
    const isArray = Array.isArray(value);
    if (typeof value !== 'object' || isArray) {
      _validator(value);

      if (isArray) return value;

      // Type checking is useful as if not performed the resulting string
      // will have all the function text inside it.
      // Adding __sjs at the end of the value as there could be an object
      // property called `string` or `number`, etc...
      // Adding __sjs at the end is a proof of value not being also an object property.
      return typeof value === 'function' ? value : `${value}__sjs`;
    }
    return value;
  });

  return { str, queue: _scv(schema, ['string', 'number', 'boolean', 'array']) };
};
