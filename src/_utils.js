
/**
 * `_find` is a super fast deep property finder.
 * It dynamically build the function needed to reach the desired
 * property.
 *
 * e.g.
 * obj = {a: {b: {c: 1}}}
 * _find(['a','b','c']) => (obj) => (((obj || {}).a || {}).b || {}).c
 *
 * @param {array} path - path to reach object property.
 */
const _find = (path) => {
  let str = 'obj';

  for (let i = 0; i < path.length; ++i) {
    str = `(${str}||{}).${path[i]}`;
  }

  return eval(`(obj=>${str})`);
};

/**
 * `_makeArraySerializer` is simply a wrapper of another `sjs` schema
 * used for the serialization of arrais.
 *
 * @param {array} array - Array to serialize.
 * @param {any} method - `sjs` serializer.
 */
const _makeArraySerializer = (serializer) => {
  if (serializer instanceof Function) {
    return (array) => {
      // Stringifying more complex array using the provided sjs schema
      let acc = '';
      const { length } = array;
      for (let i = 0; i < length - 1; i++) {
        acc += `${serializer(array[i])},`;
      }

      // Prevent slice for removing unnecessary comma.
      acc += serializer(array[length - 1]);
      return `[${acc}]`;
    };
  }

  return array => JSON.stringify(array);
};

const TYPES = [
  'number',
  'string',
  'boolean',
  'array',
  'null',
];

const attr = (type, serializer) => {
  if (!TYPES.includes(type)) {
    throw new Error(`Expected one of: "number", "string", "boolean", "null". received "${type}" instead`);
  }

  const usedSerializer = serializer || (value => value);

  return {
    isSJS: true,
    type,
    serializer: type === 'array'
      ? _makeArraySerializer(serializer)
      : usedSerializer,
  };
};

// Little utility for escaping convenience.
// => if no regex is provided, a default one will be used.
const defaultRegex = new RegExp('\\n|\\r|\\t|\\"|\\\\', 'gm');
const escape = (regex = defaultRegex) => str => str.replace(regex, char => '\\' + char);

module.exports = {
  _find,
  escape,
  attr,
};
