import _prepare from './_prepare';
import _makeQueue from './_makeQueue';
import _makeChunks from './_makeChunks';
import _select from './_select';
import { attr, escape } from './_utils';

// Doing a lot of preparation work before returning the final function responsible for
// the stringification.
const sjs = (schema) => {
  const { preparedString, preparedSchema } = _prepare(schema);

  // Providing preparedSchema for univocal correspondence between created queue and chunks.
  // Provided original schema to keep track of the original properties that gets destroied
  // during schema preparation => e.g. array stringification method.
  const queue = _makeQueue(preparedSchema, schema);
  const chunks = _makeChunks(preparedString, queue);
  const selectChunk = _select(chunks);

  const { length } = queue;

  // Exposed function
  return (obj) => {
    let temp = '';

    // Ditching old implementation for a **MUCH** faster while
    let i = 0;
    while (true) {
      if (i === length) break;
      const { serializer, find } = queue[i];
      const raw = find(obj);

      // An array needs a different treatment
      // => This will make possible the stringification of an arbitrary number of arrais
      const ready = serializer(raw);
      temp += selectChunk(ready, i);

      i += 1;
    }

    const { flag, pure, prevUndef } = chunks[chunks.length - 1];

    return temp + (flag ? prevUndef : pure);
  };
};

export {
  sjs,
  attr,
  escape,
};
