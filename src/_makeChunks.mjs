/**
 * @param {string} str - prepared string already validated.
 * @param {array} queue - queue containing the property name to match
 * (used for building dynamic regex) needed for the preparation of
 * chunks used in different scenarios.
 */
export default (str, queue) => str
  // Matching prepared properties and replacing with target with or without
  // double quotes.
  // => Avoiding unnecessary concatenation of doublequotes during serialization.
  .replace(/"(string__sjs|number__sjs|boolean__sjs)"|\[(.*?)\]/gm, (type) => {
    if (type === '"string__sjs"') {
      return '"__par__"';
    }
    return '__par__';
  })
  .split('__par__')
  .map((chunk, index) => {
    // Using dynamic regex to ensure that only the correct property
    // at the end of the string it's actually selected.
    // => e.g. ,"a":{"a": => ,"a":{
    const matchProp = new RegExp(`"${(queue[index] || {}).name}":(\"?)$`);

    // 3 possibilities after arbitrary property:
    // - ", => non-last string property
    // - , => non-last non-string property
    // - " => last string property
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
