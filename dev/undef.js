const { expect } = require('chai');
const { sjs } = require('../dist/sjs');

/**
 * Testing undefined property support with complex structures.
 */

const data = require('../test/data');

Object.keys(data).forEach((record) => {
  const { schema, obj } = data[record];
  const stringify = sjs(schema);

  const native = JSON.stringify(obj);
  const slow = stringify(obj);

  expect(slow).to.be.equal(native);
});