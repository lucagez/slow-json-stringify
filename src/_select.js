/**
 * `select` function takes all the possible chunks from the
 * current index and set the more appropriate one in relation
 * to the current `value` and the `flag` state.
 *
 * => This approach avoids the use of Regex during serialization.
 *
 * @param {any} value - value to serialize.
 * @param {number} index - position inside the queue.
 */
const _select = chunks => {
  return (hydratedQ, index) => {
    const chunk = chunks[index];
    const value = hydratedQ[index];
    const prev = hydratedQ[index - 1];
    const next = hydratedQ[index + 1];

    if (typeof value !== 'undefined') {
      if (typeof prev === 'undefined') {
        return chunk.prevUndef + value;
      }
      return chunk.pure + value;
    }

    // If the current value is undefined set a flag on the next
    // chunk stating that the previous prop is undefined.

    if (typeof prev === 'undefined') {
      return chunk.bothUndef;
    }
    if (typeof next === 'undefined') {
      return chunk.nextUndef;
    }
    return chunk.isUndef;
  };
}

// TODO: should create multiple selectors for different
// data types
// const _select = chunks => (hydratedQ, index) => {
//   const chunk = chunks[index];
//   const value = hydratedQ[index];
//   return chunk.pure + value;
// };

module.exports = _select;
