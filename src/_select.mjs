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
const _select = (chunks) => (value, index) => {
  const chunk = chunks[index];

  if (value !== undefined) {
    if (chunk.flag) {
      return chunk.prevUndef + value;
    }
    return chunk.pure + value;
  }

  // If the current value is undefined set a flag on the next
  // chunk stating that the previous prop is undefined.
  chunks[index + 1].flag = true;

  if (chunk.flag) {
    return chunk.bothUndef;
  }
  return chunk.isUndef;
};

export { _select };
