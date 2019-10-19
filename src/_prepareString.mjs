

/**
 * @param {object} schema - provided schema to validate.
 */
export default schema => JSON.stringify(schema, (_, value) => {
  if (typeof value === 'object') return value;

  return typeof value === 'function' ? 'array__sjs' : `${value}__sjs`;
});
