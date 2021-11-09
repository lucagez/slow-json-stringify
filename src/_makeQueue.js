const { _find } = require('./_utils.js');

/**
 * @param {object} preparedSchema - schema already validated
 * with modified prop values to avoid clashes.
 * @param {object} originalSchema - User provided schema
 * => contains array stringification serializers that are lost during preparation.
 */
module.exports = (preparedSchema, originalSchema) => {
  const queue = [];

  // Defining a function inside an other function is slow.
  // However it's OK for this use case as the queue creation is not time critical.
  (function scoped(obj, acc = []) {
    if (/__sjs/.test(obj)) {
      const usedAcc = Array.from(acc);
      const find = _find(usedAcc);
      const { serializer } = find(originalSchema);

      queue.push({
        serializer,
        find,
        aggregate: (arg) => serializer(find(arg)),
        name: acc[acc.length - 1],
      });
      return;
    }

    // Recursively going deeper.
    // NOTE: While going deeper, the current prop is pushed into the accumulator
    // to keep track of the position inside of the object.
    return Object
      .keys(obj)
      .map(prop => scoped(obj[prop], [...acc, prop]));
  })(preparedSchema);

  return queue;
};
