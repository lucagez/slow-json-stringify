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

**NOTE:** `SJS` won't perform any escaping as you usually don't need it in small payloads. If you work with big text, it's of very little effort to store an already escaped text.

Here is a micro utility for your escaping needs:

```javascript
const escape = str => str.replace(/\n|\r|\t|\"|\\/gm, char => '\\' + char);

// e.g.
escape('This is "funny"'); // This is \"funny\"
```

## Usage

## License

MIT.