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

## TOC

  - [TL;DR](#tldr)
  - [Installation](#installation)
  - [How it works](#how-it-works)
  - [Caveats](#caveats)
  - [Benchmarks](#benchmarks)
      - [Running the benchmarks](#running-the-benchmarks)
      - [Test machine](#test-machine)
      - [Some numbers](#some-numbers)
  - [Usage](#usage)
      - [Supported types](#supported-types)
      - [Defining a schema](#defining-a-schema)
      - [Defining schema with simple array](#defining-schema-with-simple-array)
      - [Defining schema with complex array](#defining-schema-with-complex-array)
      - [Defining schema with nested objects](#defining-schema-with-nested-objects)
  - [API](#api)
      - [sjs](#sjs)
      - [escape](#escape)
  - [License](#license)



## TL;DR

`SJS` shows a significant increase in performance over both native `JSON.stringify` and `fast-json-stringify`.
Sometimes, for some use cases (dealing with long text), it performs 10^4 faster than both native and `fast-json-stringify`.
In more varied use cases the performance improvement is of 10%-400%.
There are use cases (for example huge arrays of object with very short text) in which `SJS` performs slower than native.

It's worth noting that `SJS` does not have the flexibility of both `JSON.stringify` and `fast-json-stringify`.
But, the crazy performance improvement and the ease of schema definition might make `SJS` a good fit for you.

Checkout [benchmarks](#benchmarks).

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

**note:** `SJS` won't perform any escaping as you usually don't need it in small payloads. If you are working with big text, it could be of very little effort to store an already escaped text.

However, `SJS` provides a little utility for your escaping needs.
`escape` uses a default regex, if no additional regex is provided.

**default regex string:** 
```javascript
/\n|\r|\t|\"|\\/gm
``` 

You can use `escape` like the following:

```javascript
const { escape } = require('slow-json-stringifier');

// If you don't pass any additional regex, a default one will be used.
const escaper = escape();

escaper('This is "funny"'); // This is \"funny\"

// You can pass any regex you want for your escaping strategy.
const customEscaper = escape(/\"/gm);

customEscaper('This is "funny"'); // This is \"funny\"

```

## Benchmarks

We all know that in life there are three kinds of lies..

Lies, damned lies.. and benchmarks.

Remember to test extensively (on your specific use case) if `SJS` could be a real improvement for your performance.
Because there are times when the performance advantage with the added drawbacks could be not worth it.

#### Running the benchmarks

Every benchmark is replicable on your own machine.
To run your tests:
- clone this repo.
- install dependencies.
- execute scripts in `/benchmark` directory.

#### Test machine

The benchmarks were performed on a Dell Xps 15 9550.
**cpu:** intel i7 6700HQ
**ram:** 16gb
**os:** Ubuntu 18.04

#### Some numbers

**small-objects:**
```bash
# For small objects `fast-json-stringify` outperforms native.
# The increased performance using `SJS` is about 17%.

native x 2,854,971 ops/sec ±2.39% (83 runs sampled)
fast-json-stringify x 18,085,743 ops/sec ±1.04% (88 runs sampled)
slow-json-stringify x 21,193,276 ops/sec ±1.37% (89 runs sampled)

```

**small-array:**
```bash
# In case of small arrais, `SJS` beats only by a slight margin `fast-json`.
# The performance increase in respect to native stringify in very small.
# 
# For this use case `SJS` is not worth it.

native x 320,376 ops/sec ±2.22% (86 runs sampled)
fast-json-stringify x 396,477 ops/sec ±0.40% (91 runs sampled)
slow-json-stringify x 402,391 ops/sec ±2.46% (89 runs sampled)
```

**nested-props-short-text:**
```bash
# `SJS` is faster on nested properties and short text

native x 911,912 ops/sec ±1.67% (86 runs sampled)
fast-json-stringify x 3,337,796 ops/sec ±1.62% (87 runs sampled)
slow-json-stringify x 4,636,561 ops/sec ±3.18% (88 runs sampled)
```

**nested-props-short-text:**
```bash
# `SJS` is faster on more properties and short text

native x 703,142 ops/sec ±2.04% (84 runs sampled)
fast-json-stringify x 843,441 ops/sec ±2.81% (87 runs sampled)
slow-json-stringify x 1,150,923 ops/sec ±1.20% (84 runs sampled)
```

**much-props-big-text:**
```bash
# If you need to send a lot of text over the wire `SJS` is like the fastest thing in the galaxy.

native x 18,527 ops/sec ±0.83% (82 runs sampled)
fast-json-stringify x 17,113 ops/sec ±0.61% (92 runs sampled)
slow-json-stringify x 1,349,498 ops/sec ±0.44% (94 runs sampled)
```


**big-text:**
```bash
# We can observe that `SJS` ops/sec remain constant given a huge increase in text length

native x 199,323 ops/sec ±2.34% (80 runs sampled)
fast-json-stringify x 226,009 ops/sec ±1.57% (87 runs sampled)
slow-json-stringify x 23,643,207 ops/sec ±0.69% (92 runs sampled)
```

**big-array-short-text:**
```bash
# `SJS` only slightly faster => not worth it for this use case.

native x 3,351 ops/sec ±0.81% (85 runs sampled)
fast-json-stringify N/A => dynamic arrais not supported
slow-json-stringify x 3,528 ops/sec ±2.86% (89 runs sampled)
```

**big-array-long-text:**
```bash
# `SJS` 4x faster than native

native x 88.25 ops/sec ±1.09% (75 runs sampled)
fast-json-stringify N/A => dynamic arrais not supported
slow-json-stringify x 378 ops/sec ±0.78% (86 runs sampled)
```

**big-array-long-number:**
```bash
# `SJS` 2x faster than native

native x 950 ops/sec ±1.07% (89 runs sampled)
fast-json-stringify N/A => dynamic arrais not supported
slow-json-stringify x 1,944 ops/sec ±2.78% (90 runs sampled)
```

## Usage

#### Supported types

You can use the following types:
- `string`, `Date` will be considered strings.
- `number`
- `boolean`, ➡ used for both `true/false` AND `null` ⬅
- `[array-simple]`, dynamic arrais with simple structure, in this scenario native `JSON.stringify` will be used. As there are no real performance advantages.
- `[schema]`, dynamic complex arrais. You should provide a `SJS` schema defining the structure of the objects that will make up your array.

**NOTE:** `SJS` is making a template from the provided schema and inserting values where necessary. So, if `undefined` values are provided, a string containing "undefined" will be returned.

**tip:** If you want to leave out certain properties from the stringified object, simply provide a schema without those properties. 

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

#### Defining schema with simple array

When stringifying simple arrais `JSON.stringify` will be internally used.

```javascript
const { sjs } = require('slow-json-stringifier');

// schema definition
const stringify = sjs({
  a: ['array-simple']
});

// then you can stringify anything with that structure.
stringify({
  a: [1, 2, 3, true, 'world'],
});

// {"a":[1,2,3,true,"world"]}

```

#### Defining schema with complex array

This is one of the strong points of `SJS`. 
When stringifying complex arrais a new schema is required.

```javascript
const { sjs } = require('slow-json-stringifier');

// schema definition
const stringify = sjs({
  a: [sjs({
    b: 'string',
    c: 'number',
  })]
});

// then you can stringify anything with that structure.
stringify({
  a: [{
    b: 'ciao1',
    d: 1,
  }, {
    b: 'ciao2',
    d: 2,
  }, {
    b: 'ciao3',
    d: 3,
  }, {
    b: 'ciao4',
    d: 4,
  }],
});

// {"a":[{"b":"ciao1","d":1},{"b":"ciao2","d":2},{"b":"ciao3","d":3},{"b":"ciao4","d":4}]}

```

#### Defining schema with nested objects

Defining schemas with nested objects is pretty straightforward.

```javascript
const { sjs } = require('slow-json-stringifier');

// schema definition
const stringify = sjs({
  a: {
    b: {
      c: 'string',
    },
  },
  d: {
    e: 'number',
  },
});

stringify({
  a: {
    b: {
      c: 'hello',
    },
  },
  d: {
    e: 'world',
  },
});

// {"a":{"b":{"c":"hello"}},"d":{"e":"world"}}

```

## API

#### sjs
| param  | type    | required                           | default   | spec                                                |
|--------|---------|------------------------------------|-----------|-----------------------------------------------------|
| schema | object  | yes                                | undefined | Schema that defines the stringification behavior.   |

#### escape
| param | type               | required                           | default                   | spec                                                |
|-------|--------------------|------------------------------------|---------------------------|-----------------------------------------------------|
| regex | Regular Expression | no                                 | default regex | regex used to escape text                           |

## License

MIT.