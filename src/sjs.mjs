import _dissectSchema from './_dissectSchema';
import _makeQueue from './_makeQueue';
import { _deepFind, _makeArr, escape } from './_utils';

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
  const { map, arrais, props, str } = _dissectSchema(schema);

  // Building regex that match every prop => Used to enqueue props
  // => So they will be picked in correct order when building final string.
  const regex = new RegExp(`${props}"(string|number|boolean|undef)"|\\[(.*?)\\]`, 'gm');

  const { queue, chunks } = _makeQueue(str, regex);
  const lastChunk = chunks[chunks.length - 1];
  const readyOrWrapped = wrapper(chunks);

  const { length } = queue;
  // Exposed function
  return (obj) => {
    let temp = '';


    let i = 0;
    for (; ;) {
      if (i === length) break;

      const current = queue[i];
      const raw = _deepFind(obj, map[current]);

      // Arrais need a different treatment
      // => This will make possible the stringification of an arbitrary number of arrais
      const ready = arrais.has(current)
        ? _makeArr(raw, arrais.get(current))
        : raw;
      temp += chunks[i] + readyOrWrapped(ready, i);

      i += 1;
    }

    // queue.forEach((e, i) => {
    //   const raw = _deepFind(obj, map[e]);

    //   // Arrais need a different treatment
    //   // => This will make possible the stringification of an arbitrary number of arrais
    //   const ready = arrais.has(e)
    //     ? _makeArr(raw, arrais.get(e))
    //     : raw;
    //   temp += chunks[i] + (() => {
    //     if (typeof ready !== 'undefined') return ready;

    //     // Checking if template is already wrapping value in double quotes.
    //     const current = chunks[i];
    //     if (current.charCodeAt(current.length - 1) === 34) return ready;
    //     return '"' + ready + '"';
    //   })();
    // });
    return temp + lastChunk;
  };
};

export {
  sjs,
  escape,
};
