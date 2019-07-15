
export default (str, queue) => str
  .replace(/"(string__sjs|number__sjs|boolean__sjs)"|\[(.*?)\]/gm, (type) => {
    if (type === '"string__sjs"') {
      return '"__par__"';
    }
    return '__par__';
  })
  .split('__par__')
  .map((chunk, index) => {
    const matchProp = new RegExp(`"${(queue[index] || {}).name}":(\"?)$`);
    const matchStart = /^(\"\,|\,|\")/;

    return {
      pure: chunk,
      prevUndef: chunk.replace(matchStart, ''),
      isUndef: chunk.replace(matchProp, ''),
      bothUndef: chunk
        .replace(matchStart, '')
        .replace(matchProp, ''),
    };
  });
