<p align="center">
  <img src="sjs.svg" height="200px" alt="slow-json-stringify logo" />
  <br>
  <a href="https://travis-ci.org/lucagez/slow-json-stringify"><img src="https://travis-ci.com/lucagez/slow-json-stringify.svg?branch=master" alt="travis"></a>
  <a href="https://www.npmjs.org/package/slow-json-stringify"><img src="https://img.shields.io/npm/v/slow-json-stringify.svg?style=flat" alt="npm"></a>
  <img src="https://img.shields.io/badge/license-MIT-f1c40f.svg" alt="MIT">
  <a href="https://unpkg.com/slow-json-stringify"><img src="https://img.badgesize.io/https://unpkg.com/slow-json-stringify/dist/sjs.js?compression=gzip" alt="gzip size"></a>
</p>

# SJS

The slowest stringifier in the known universe. Just kidding, it's the fastest (:

## Installation

`SJS` is fully compatible with both Node.js and the browser 🎉🎉

Node:
```bash
npm install slow-json-stringify
```

On the browser:
```html
<script src="https://unpkg.com/slow-json-stringify/dist/sjs.umd.js"></script>
```

## How it works

Why `SJS` is the fastest stringifier?
The traditional approach consists in serializing every property singularly.
`SJS` uses a different approach to serialization.

**Preparation:**
- A schema is provided
- The schema is stringified
- A template string is built with the provided schema.

**Serialization:**
- Object values are inserted in the already built template.

It is faster simply because it performs a lot less work.

## Caveats

`SJS` does not have the flexibility of the native JSON.stringify.
But, if you are dealing with json with a fixed structure `SJS` will save you a ton of time.
Especially when the payload grows. And incredibly when serializing json with long text inside (think of a blog article or a product description...).

**NOTE:** `SJS` won't perform any escaping as you usually don't need it in small payloads. If you are working with big text, it could be of very little effort to store an already escaped text.

However, `SJS` provides a little utility for your escaping needs.
`escape` uses a default regex, if no additional regex is provided.

**default regex string:** '\\n|\\r|\\t|\\"|\\\\' 
This weird 

```javascript
const { escape } = require('slow-json-stringifier');

// If you don't pass any additional regex, a default one will be used.
const escaper = escape();

escaper('This is "funny"'); // This is \"funny\"

// You can pass any regex you want for your escaping strategy.
const customEscaper = escape(/\"/gm);

customEscaper('This is "funny"'); // This is \"funny\"

```

## Usage

#### Supported types

You can use the following types:
- string
- number
- boolean

#### Defining a schema

For a correct stringification of your json payload, a correct schema is mandatory.
Defining a schema is pretty handy and not verbose at all.

```javascript
const { sjs } = require('slow-json-stringifier');

// schema definition
const stringify = sjs({
  a: 'string',
  b: 'number',
  c: 'boolean',
});

// then you can stringify anything with that structure.
stringify({
  a: 'world',
  b: 42,
  c: true,
});

// {"a":"world","b":42,"c":true}

```



## License

MIT.