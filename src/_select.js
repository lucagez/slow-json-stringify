const _select = (chunks, queue) => {
  let prev;
  let curr;
  let next;

  return (obj, index) => {
    const chunk = chunks[index];
    const cprev = prev;
    const value = next || (prev = queue[index]?.aggregate(obj));
    const cnext = curr = queue[index + 1]?.aggregate(obj);

    if (typeof value !== 'undefined') {
      if (typeof cprev === 'undefined') {
        return chunk.prevUndef + value;
      }
      return chunk.pure + value;
    }

    if (typeof cprev === 'undefined') {
      return chunk.bothUndef;
    }

    if (typeof cnext === 'undefined') {
      return chunk.nextUndef;
    }

    return chunk.isUndef;
  };
}

module.exports = _select;
