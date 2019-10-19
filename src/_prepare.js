
/**
 * `_prepare` - aims to normalize the schema provided by the user.
 * It will convert the schema in both a parseable string and an object
 * useable for making the chunks needed for the serialization part.
 * @param {object} schema - user provided schema
 */
const _prepare = (schema) => {
  const preparedString = JSON.stringify(schema, (_, value) => {
    if (typeof value === 'object') return value;
    return value instanceof Function
      ? 'array__sjs'
      : `${value}__sjs`;
  });

  const preparedSchema = JSON.parse(preparedString);

  return {
    preparedString,
    preparedSchema,
  };
};

export default _prepare;
