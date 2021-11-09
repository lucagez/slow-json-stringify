const _prepare  = require('./_prepare');
const _makeQueue  = require('./_makeQueue');
const _makeChunks  = require('./_makeChunks');
const _select  = require('./_select');
const { attr, escape }  = require('./_utils');

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
  const { pure: lastChunk } = chunks[chunks.length - 1];

  const withSerializerQ = queue.map(({
    serializer,
    find,
  }, index) => {
    return (obj) => {
      const value = serializer(find(obj));

    }
  })

  const { length } = queue;

  // Exposed function
  return (obj) => {
    /**
     * Flags should live here..
     * here it should be the place where the triad
     * prev, curr, next is stored with booleans
     * to minimize object accesses
     */
      // TODO: Find a way of removing this loop..
      // increasing complexity to 2N
      // e.g. change to getRaw(index, obj) -> serializer(find(obj))
    // const hydratedQueue = queue.map(({
    //   serializer,
    //   find,
    // }) => serializer(find(obj)))

    const hydratedQueue = [];
    for (let i = 0; i < length; i++) {
      const { serializer, find } = queue[i];
      hydratedQueue.push(serializer(find(obj)));
    }

    let temp = '';
    for (let i = 0; i < length; i++) {
      // TODO: Export a single function
      // const { serializer, find } = queue[i];
      temp += selectChunk(hydratedQueue, i);
    }

    return temp + lastChunk;
  };
};

module.exports = {
  sjs,
  attr,
  escape,
};
