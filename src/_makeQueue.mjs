import { _find } from './_utils';

/**
 * @param {object} preparedSchema - schema already validated
 * with modified prop values to avoid clashes.
 * @param {object} originalSchema - User provided schema
 * => contains array stringification serializers that are lost during preparation.
 */
export default (preparedSchema, originalSchema) => {
  const queue = [];

  // Defining a function inside an other function is slow.
  // However it's OK for this use case as the queue creation is not time critical.
  (function scoped(obj, acc = []) {
    if (/__sjs/.test(obj)) {
      const usedAcc = Array.from(acc);
      const find = _find(usedAcc);
      const serializer = find(originalSchema);

      queue.push({
        // Storing iside a unique queue is the current prop is an array or not
        isArray: serializer instanceof Function,

        // If the current prop is an array, the array stringification serializer is stored too.
        // The serializer for the array stringification, in SJS, is always stored at 0 position.
        serializer,

        // The find function is the function needed to reach that specific property
        // inside the object.
        find,

        name: usedAcc[usedAcc.length - 1],
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
