// export default (str, regex) => str
//   .replace(regex, (type) => {
//     switch (type) {
//       // returning __par__ enclosed by ""
//       // => When splitting there will be a " on each side.
//       case '"string__sjs"':
//       case '"undefined__sjs"':
//         return '"__par__"';

//       // When stringifying a function inside an array [null] is returned.
//       // => Using [null] as an identifier for array schema.
//       case '"number__sjs"':
//       case '"boolean__sjs"':
//       case '["array-simple__sjs"]':
//       case '[null]':
//         return '__par__';
//       default:
//         return type;
//     }
//   })
//   .split('__par__');

export default (str, regex) => str
  .replace(regex, (type) => {
    if (type === '"string__sjs"') {
      return '"__par__"';
    }
    return '__par__';
  })
  .split('__par__');
