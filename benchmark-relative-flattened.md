
> slow-json-stringify@2.0.1 benchmark /Users/luca.gesmundo/me/slow-json-stringify
> cd benchmark && sh run.sh


# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 3,633,001 ops/sec ±2.96% (89 runs sampled)
slow-json-stringify x 52,006,413 ops/sec ±1.01% (95 runs sampled)
slow-json-stringify-flatten x 51,590,192 ops/sec ±0.77% (95 runs sampled)

# slow-json-stringify is +0.81% faster

```

## small-array 

```bash
native x 316,794 ops/sec ±5.31% (84 runs sampled)
slow-json-stringify x 1,014,889 ops/sec ±1.34% (85 runs sampled)
slow-json-stringify-flatten x 1,105,377 ops/sec ±0.58% (89 runs sampled)

# slow-json-stringify-flatten is +8.92% faster

```

## nested-props-short-text 

```bash
native x 824,463 ops/sec ±1.19% (89 runs sampled)
slow-json-stringify x 10,993,159 ops/sec ±0.29% (90 runs sampled)
slow-json-stringify-flatten x 11,585,080 ops/sec ±0.96% (93 runs sampled)

# slow-json-stringify-flatten is +5.38% faster

```

## much-props-short-text 

```bash
native x 751,831 ops/sec ±0.80% (95 runs sampled)
slow-json-stringify x 2,455,491 ops/sec ±0.91% (89 runs sampled)
slow-json-stringify-flatten x 2,515,419 ops/sec ±0.46% (93 runs sampled)

# slow-json-stringify-flatten is +2.44% faster

```

## much-props-big-text 

```bash
native x 20,618 ops/sec ±0.71% (92 runs sampled)
slow-json-stringify x 2,756,923 ops/sec ±0.51% (94 runs sampled)
slow-json-stringify-flatten x 2,824,019 ops/sec ±0.56% (90 runs sampled)

# slow-json-stringify-flatten is +2.43% faster

```

## big-text 

```bash
native x 255,721 ops/sec ±0.47% (89 runs sampled)
slow-json-stringify x 56,802,176 ops/sec ±0.17% (97 runs sampled)
slow-json-stringify-flatten x 56,594,977 ops/sec ±0.43% (94 runs sampled)

# slow-json-stringify,slow-json-stringify-flatten is +0.37% faster

```

## big-array-short-text 

```bash
native x 4,393 ops/sec ±0.81% (95 runs sampled)
slow-json-stringify x 9,518 ops/sec ±1.33% (90 runs sampled)
slow-json-stringify-flatten x 9,492 ops/sec ±0.44% (91 runs sampled)

# slow-json-stringify-flatten,slow-json-stringify is +0.27% faster

```

## big-array-long-text 

```bash
native x 92.41 ops/sec ±0.97% (78 runs sampled)
slow-json-stringify x 9,519 ops/sec ±0.73% (89 runs sampled)
slow-json-stringify-flatten x 9,560 ops/sec ±0.44% (93 runs sampled)

# slow-json-stringify-flatten,slow-json-stringify is +0.43% faster

```

## big-array-long-number 

```bash
native x 1,102 ops/sec ±0.67% (90 runs sampled)
slow-json-stringify x 3,089 ops/sec ±1.81% (88 runs sampled)
slow-json-stringify-flatten x 3,300 ops/sec ±1.27% (87 runs sampled)

# slow-json-stringify-flatten is +6.87% faster

```

## undefined properties 

```bash
native x 2,372,475 ops/sec ±0.36% (90 runs sampled)
slow-json-stringify x 19,522,029 ops/sec ±1.03% (94 runs sampled)
slow-json-stringify-flatten x 20,519,716 ops/sec ±0.36% (94 runs sampled)

# slow-json-stringify-flatten is +5.11% faster

```

