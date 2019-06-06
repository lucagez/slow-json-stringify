import _dissectSchema from './_dissectSchema';
import _makeQueue from './_makeQueue';
import { _deepFind, _makeArr, _validator, escape } from './_utils';

const wrapper = chunks => (value, index) => {
  if (typeof value !== 'undefined') return value;

  // Checking if template is already wrapping value in double quotes.
  const current = chunks[index];
  if (current.charCodeAt(current.length - 1) === 34) return value;
  return '"' + value + '"';
};


// Doing a lot of preparation work before returning the final function responsible for
// the stringification.
const sjs = (schema) => {
  _validator(schema);

  const { props, str, queue } = _dissectSchema(schema);

  // Building regex that match every prop => Used to enqueue props
  // => So they will be picked in correct order when building final string.
  const regex = new RegExp(`${props}"(string|number|boolean|undef)"|\\[(.*?)\\]`, 'gm');

  const { chunks } = _makeQueue(str, regex);
  const lastChunk = chunks[chunks.length - 1];
  const readyOrWrapped = wrapper(chunks);

  const { length } = queue;
  // Exposed function
  return (obj) => {
    let temp = '';

    // Ditching old implementation for a **MUCH** faster while
    let i = 0;
    while (true) {
      if (i === length) break;
      const { path, method, isArray } = queue[i];
      const raw = _deepFind(obj, path);

      // An array needs a different treatment
      // => This will make possible the stringification of an arbitrary number of arrais
      const ready = isArray
        ? _makeArr(raw, method)
        : raw;
      temp += chunks[i] + readyOrWrapped(ready, i);

      i += 1;
    }

    return temp + lastChunk;
  };
};

export {
  sjs,
  escape,
};
