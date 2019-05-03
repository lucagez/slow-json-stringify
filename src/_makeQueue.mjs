export default (str, regex) => {
  const queue = [];

  // Replacing types with a string that will make possible:
  // - Inserting value without adding / removing additional charachters.
  // - Split templated string in chunks for easier / faster insertion
  const chunks = str
    .replace(regex, (type) => {
      switch (type) {
        // returning __par__ enclosed by ""
        // => When splitting there will be a " on each side.
        case '"string"':
        case '"undefined"':
          return '"__par__"';

        // When stringifying a function inside an array [null] is returned.
        // => Using [null] as an identifier for array schema.
        case '"number"':
        case '"boolean"':
        case '["array-simple"]':
        case '[null]':
          return '__par__';
        default:
          // Pushing prop to queue => prop is enclosed by "" => matching before pushing
          const prop = type.match(/(?<=\").+?(?=\")/)[0];
          queue.push(prop);
          return type;
      }
    })
    .split('__par__');

  return { queue, chunks };
};
