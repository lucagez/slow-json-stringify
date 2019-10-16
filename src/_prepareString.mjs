import { _validator } from './_utils';

/**
 * @param {object} schema - provided schema to validate.
 */
export default schema => JSON.stringify(schema, (_, value) => {
  const isArray = Array.isArray(value);
  if (typeof value !== 'object' || isArray) {
    // Check if the provided schema is correct
    _validator(value);

    if (isArray) return value;

    console.log(value);

    // Type checking is useful as if not performed the resulting string
    // will have all the function text inside it.
    // Adding __sjs at the end of the value as there could be an object
    // property called `string` or `number`, etc...
    // Adding __sjs at the end is a proof of value not being also an object property.
    return typeof value === 'function' ? value : `${value}__sjs`;
  }
  return value;
});
