import _dissectSchema from './_dissectSchema';
import _makeQueue from './_makeQueue';
import { _deepFind, _makeArr, escape } from './_utils';

// Doing a lot of preparation work before returning the final function responsible for
// the stringification.
const sjs = (schema) => {
  const { map, arrais, props, str } = _dissectSchema(schema);

  // Building regex that match every prop => Used to enqueue props
  // => So they will be picked in correct order when building final string.
  const regex = new RegExp(`${props}"(string|number|boolean|undef)"|\\[(.*?)\\]`, 'gm');

  const { queue, chunks } = _makeQueue(str, regex);
  const lastChunk = chunks[chunks.length - 1];

  // Exposed function
  return (obj) => {
    let temp = '';
    queue.forEach((e, i) => {
      const raw = _deepFind(obj, map[e]);

      // Arrais need a different treatment
      // => This will make possible the stringification of an arbitrary number of arrais
      const ready = arrais.has(e)
        ? _makeArr(raw, arrais.get(e))
        : raw;
      temp += chunks[i] + ready;
    });
    return temp + lastChunk;
  };
};

export {
  sjs,
  escape,
};
