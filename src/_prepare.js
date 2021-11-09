
/**
 * `_prepare` - aims to normalize the schema provided by the user.
 * It will convert the schema in both a parseable string and an object
 * useable for making the chunks needed for the serialization part.
 * @param {object} schema - user provided schema
 */
const _prepare = (schema) => {
  const preparedString = JSON.stringify(schema, (_, value) => {
    if (!value.isSJS) return value;
    return `${value.type}__sjs`;
  });

  const preparedSchema = JSON.parse(preparedString);

  return {
    preparedString,
    preparedSchema,
  };
};

module.exports = _prepare;
