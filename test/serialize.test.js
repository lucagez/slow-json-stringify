const chai = require('chai');
const spies = require('chai-spies');
const { sjs, attr } = require('../src/sjs');

chai.use(spies);

const { expect, spy } = chai;

/**
 * The serialization feature add support for custom validation or hide/show
 * property based on a set of rules.
 */

describe('Serialization and validation support tests', () => {
  it('invoke a function while serializing single property', () => {
    function serializer() {}

    const spySerializer = spy(serializer);

    const stringify = sjs({
      a: attr('string', spySerializer),
    });

    stringify({ a: 'hello' });

    expect(spySerializer).to.have.been.called(1);
  });

  it('invoke serializer providing raw property', () => {
    function serializer(raw) {
      expect(raw).to.equal('hello');
    }

    const spySerializer = spy(serializer);

    const stringify = sjs({
      a: attr('string', spySerializer),
    });

    stringify({ a: 'hello' });

    expect(spySerializer).to.have.been.called(1);
  });

  it('skip property serialization when serializer return undefined', () => {
    const stringify = sjs({
      a: attr('string', () => undefined),
      b: attr('number', () => undefined),
    });

    const empty = stringify({ a: 'hello', b: 42 });

    expect(empty).to.equal('{}');
  });

  it('serialize returned value from serializer', () => {
    const stringify = sjs({
      a: attr('string', raw => raw === 'hello' ? 'world' : 'pino'),
    });

    expect(stringify({ a: 'hello' })).to.equal('{"a":"world"}');
    expect(stringify({ a: 'ginetto' })).to.equal('{"a":"pino"}');
  });
});
