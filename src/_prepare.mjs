const _stringifyCallback = (_, value) => {
  if (!value.isSJS) return value;
  return `${value.type}__sjs`;
};

/**
 * `_prepare` - aims to normalize the schema provided by the user.
 * It will convert the schema in both a parseable string and an object
 * useable for making the chunks needed for the serialization part.
 * @param {object} schema - user provided schema
 */
const _prepare = (schema) => {
  const _preparedString = JSON.stringify(schema, _stringifyCallback);
  const _preparedSchema = JSON.parse(_preparedString);

  return {
    _preparedString,
    _preparedSchema,
  };
};

export { _prepare };
