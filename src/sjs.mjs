import { _prepare } from "./_prepare.mjs";
import { _makeQueue } from "./_makeQueue.mjs";
import { _makeChunks } from "./_makeChunks.mjs";
import { _select } from "./_select.mjs";
import { attr, escape } from "./_utils.mjs";

// Doing a lot of preparation work before returning the final function responsible for
// the stringification.
const sjs = (schema) => {
  const { _preparedString, _preparedSchema } = _prepare(schema);

  // Providing preparedSchema for univocal correspondence between created queue and chunks.
  // Provided original schema to keep track of the original properties that gets destroied
  // during schema preparation => e.g. array stringification method.
  const queue = _makeQueue(_preparedSchema, schema);
  const chunks = _makeChunks(_preparedString, queue);
  const selectChunk = _select(chunks);

  // Exposed function
  return (obj) => {
    let temp = "";

    for (let i = 0; i < queue.length; ++i) {
      const { serializer, find } = queue[i]
      const raw = find(obj)

      temp += selectChunk(serializer(raw), i)
    }

    const { flag, pure, prevUndef } = chunks[chunks.length - 1];

    return temp + (flag ? prevUndef : pure);
  };
};

export { sjs, attr, escape };
