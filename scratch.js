const { sjp, attr } = require('./dist/sjs');

const serializer = sjp({
  hello: attr('string'),
  doom: attr('string'),
});

serializer({ hello: 'world', doom: 'lol' });
