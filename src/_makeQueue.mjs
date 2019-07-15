import { _find } from './_utils';

export default (preparedSchema, originalSchema) => {
  const queue = [];

  // Storing the allowed types is useful to know if we are arrived at the deepest level.
  // If the current value is one of types => the accumulator is storing the path to reach the
  // target prop.
  const allowedValues = new Set([
    'number__sjs',
    'string__sjs',
    'boolean__sjs',
    'undefined__sjs',
  ]);

  // Defining a function inside an other function is slow.
  // However it's OK for this use case as the queue creation is not time critical.
  (function scoped(obj, acc = []) {
    const isArray = Array.isArray(obj);
    if (allowedValues.has(_find(acc)(preparedSchema)) || isArray) {
      const usedAcc = Array.from(acc);
      const find = _find(usedAcc);

      queue.push({
        // Storing iside a unique queue is the current prop is an array or not
        isArray,
        // If the current prop is an array, the array stringification method is stored too.
        // The method for the array stringification, in SJS, is always stored at 0 position.
        method: isArray && (() => {
          if (typeof obj[0] === 'string') return 'array-simple';

          // In the prepared schema, due to making the chunks, the functions provided
          // are converted into NULL.
          // So, the method is retrieved from the original schema.
          return find(originalSchema)[0];
        })(),

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
