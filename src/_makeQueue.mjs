import { _deepFind } from './_utils';

export default (preparedSchema, originalSchema) => {
  const queue = [];

  // Storing the allowed types is useful to know if we are arrived at the deepest level.
  // If the current value is one of types => the accumulator is storing the path to reach the
  // target prop.
  const allowedValues = new Set(['number__sjs', 'string__sjs', 'boolean__sjs', 'undefined__sjs']);

  // Defining a function inside an other function is slow.
  // However it's OK for this use case as the queue creation is not time critical.
  (function scoped(obj, acc = []) {
    const isArray = Array.isArray(obj);
    if (allowedValues.has(_deepFind(preparedSchema, acc)) || isArray) {
      queue.push({
        // Storing iside a unique queue is the current prop is an array or not
        isArray,
        // If the current prop is an array, the array stringification method is stored too.
        // The method for the array stringification, in SJS, is always stored at 0 position.
        method: (() => {
          if (!isArray) return false;
          if (typeof obj[0] === 'string') return 'array-simple';

          // In the prepared schema, due to making the chunks, the functions provided
          // are converted into NULL.
          // So, the method is retrieved from the original schema.
          return _deepFind(originalSchema, acc)[0];
        })(),

        // Wrapping `acc` inside an array because, if the prop is found at top level,
        // a string is pushed inside the queue. Making it already an array will avoid
        // a type check during stringification as the `deepFind` function accepts only
        // arrais as arguments.
        path: Array.isArray(acc) ? acc : [acc],
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
