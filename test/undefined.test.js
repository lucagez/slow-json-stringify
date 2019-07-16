const { expect } = require('chai');
const { sjs } = require('../dist/sjs');

/**
 * Testing undefined property support with complex structures.
 */

const data = require('./data');

describe('Undefined support tests', () => {
  Object.keys(data).forEach((record) => {
    const { schema, obj } = data[record];
    console.log(record);
    const stringify = sjs(schema);

    it('Serialize structure as native JSON.stringify', () => {
      const native = JSON.stringify(obj);
      const slow = stringify(obj);

      expect(slow).to.be.equal(native);
    });
  });
});
