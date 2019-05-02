const { expect } = require('chai');
const sjs = require('../dist/sjs');

describe('Slow-json-stringifier tests', () => {
  it('Should throw if unknown type is provided when defining a schema', () => {
    const schemaDefinition = () => sjs({
      a: 'sting', // Typo
    });
    const schemaDefinition1 = () => sjs({
      a: ['arry-simple'], // Typo
    });

    expect(schemaDefinition).to.throw();
    expect(schemaDefinition1).to.throw();
  });

  it('Should not throw if known type is provided when defining a schema', () => {
    const schemaDefinition = () => sjs({
      a: 'string',
      b: 'number',
      c: 'boolean',
    });
    const schemaDefinition1 = () => sjs({
      a: ['array-simple'],
      b: [sjs({
        a: 'string',
      })],
    });

    expect(schemaDefinition).to.not.throw();
    expect(schemaDefinition1).to.not.throw();
  });

  it('Should stringify a simple object equivalently to native JSON.stringify', () => {
    const stringify = sjs({
      hello: 'string',
    });

    const test = { hello: 'world' };
    const native = JSON.stringify(test);
    const slow = stringify(test);

    expect(slow).to.be.a('string').equal(native);
  });

  it('Should stringify an object with nested props equivalently to native JSON.stringify', () => {
    const stringify = sjs({
      hello: 'string',
      a: 'number',
      b: 'boolean',
      c: {
        d: {
          e: 'string',
        },
      },
    });

    const test = {
      hello: 'world',
      a: 123,
      b: false,
      c: {
        d: {
          e: 'pernacchia',
        },
      },
    };
    const native = JSON.stringify(test);
    const slow = stringify(test);

    expect(slow).to.be.a('string').equal(native);
  });

  it('Should stringify an object with simple arrais equivalently to native JSON.stringify', () => {
    const stringify = sjs({
      hello: 'string',
      a: ['array-simple'],
    });

    const test = {
      hello: 'world',
      a: [1, 2, 'test'],
    };
    const native = JSON.stringify(test);
    const slow = stringify(test);

    expect(slow).to.be.a('string').equal(native);
  });

  it('Should stringify an object with complex arrais equivalently to native JSON.stringify', () => {
    const stringify = sjs({
      hello: 'string',
      a: [sjs({
        b: 'string',
        c: {
          d: 'number',
        },
      })],
    });

    const test = {
      hello: 'world',
      a: [{
        b: 'test',
        c: {
          d: 189,
        },
      }, {
        b: 'test1',
        c: {
          d: 1892312,
        },
      }, {
        b: 'test2',
        c: {
          d: 9,
        },
      }, {
        b: 'test3',
        c: {
          d: 9.89,
        },
      }, {
        b: 'test4',
        c: {
          d: 1.323289,
        },
      }],
    };
    const native = JSON.stringify(test);
    const slow = stringify(test);

    expect(slow).to.be.a('string').equal(native);
  });

  it('Should stringify correct json syntax given a simple object', () => {
    const stringify = sjs({
      hello: 'string',
    });

    const test = { hello: 'world' };
    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    expect(t).to.not.throw();
  });

  it('Should stringify correct json syntax given a complex object', () => {
    const stringify = sjs({
      hello: 'string',
      a: 'number',
      b: 'boolean',
      c: {
        d: {
          e: 'string',
        },
      },
    });

    const test = {
      hello: 'world',
      a: 123,
      b: false,
      c: {
        d: {
          e: 'pernacchia',
        },
      },
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    expect(t).to.not.throw();
  });

  it('Should stringify correct json syntax given an object with dynamic arrais', () => {
    const stringify = sjs({
      hello: 'string',
      a: [sjs({
        b: 'string',
        c: {
          d: 'number',
        },
      })],
    });

    const test = {
      hello: 'world',
      a: [{
        b: 'test',
        c: {
          d: 189,
        },
      }, {
        b: 'test1',
        c: {
          d: 1892312,
        },
      }, {
        b: 'test2',
        c: {
          d: 9,
        },
      }, {
        b: 'test3',
        c: {
          d: 9.89,
        },
      }, {
        b: 'test4',
        c: {
          d: 1.323289,
        },
      }],
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    expect(t).to.not.throw();
  });
});
