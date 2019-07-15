import _prepareString from './_prepareString';
import _makeQueue from './_makeQueue';
import _makeChunks from './_makeChunks';
import { _makeArr, escape } from './_utils';

const wrapper = chunks => (value, index) => {
  if (typeof value !== 'undefined') return chunks[index] + value;

  // Checking if template is already wrapping value in double quotes.
  if (typeof chunks[index + 1] !== 'undefined') {
    chunks[index + 1] = chunks[index + 1].replace(/^(\"\,|\,|\")/, '');
  }
  return chunks[index].replace(/(\,\"|[^{])+$/, '');
};


// Doing a lot of preparation work before returning the final function responsible for
// the stringification.
const sjs = (schema) => {
  const preparedString = _prepareString(schema);

  // Building regex that match every prop => Used to enqueue props
  // => So they will be picked in correct order when building final string.
  const regex = new RegExp('"(string__sjs|number__sjs|boolean__sjs|undefined__sjs)"|\\[(.*?)\\]', 'gm');

  const chunks = _makeChunks(preparedString, regex);
  const readyOrWrapped = wrapper(chunks);

  const preparedSchema = JSON.parse(preparedString);

  // Providing preparedSchema for univocal correspondence between created queue and chunks.
  // Provided original schema to keep track of the original properties that gets destroied
  // during schema preparation => e.g. array stringification method.
  const queue = _makeQueue(preparedSchema, schema);

  const { length } = queue;
  // Exposed function
  return (obj) => {
    let temp = '';

    // Ditching old implementation for a **MUCH** faster while
    let i = 0;
    while (true) {
      if (i === length) break;
      const { method, isArray, find } = queue[i];
      const raw = find(obj);

      // An array needs a different treatment
      // => This will make possible the stringification of an arbitrary number of arrais
      const ready = isArray
        ? _makeArr(raw, method)
        : raw;
      temp += readyOrWrapped(ready, i);

      i += 1;
    }

    return temp + chunks[chunks.length - 1];
  };
};

export {
  sjs,
  escape,
};
