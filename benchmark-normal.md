
> slow-json-stringify@2.0.1 benchmark /Users/luca.gesmundo/me/slow-json-stringify
> cd benchmark && sh run.sh


# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 3,730,490 ops/sec ±2.84% (91 runs sampled)
fast-json-stringify x 55,217,937 ops/sec ±0.12% (95 runs sampled)
slow-json-stringify x 56,829,533 ops/sec ±0.59% (94 runs sampled)

# slow-json-stringify is +2.92% faster

```

## small-array 

```bash
native x 339,112 ops/sec ±0.53% (88 runs sampled)
fast-json-stringify x 425,930 ops/sec ±0.53% (97 runs sampled)
slow-json-stringify x 1,192,221 ops/sec ±1.09% (92 runs sampled)

# slow-json-stringify is +179.91% faster

```

## nested-props-short-text 

```bash
native x 838,737 ops/sec ±0.66% (91 runs sampled)
fast-json-stringify x 3,577,531 ops/sec ±0.55% (93 runs sampled)
slow-json-stringify x 11,501,223 ops/sec ±0.36% (92 runs sampled)

# slow-json-stringify is +221.48% faster

```

## much-props-short-text 

```bash
native x 745,820 ops/sec ±0.35% (93 runs sampled)
fast-json-stringify x 860,018 ops/sec ±1.13% (86 runs sampled)
slow-json-stringify x 2,348,637 ops/sec ±0.65% (84 runs sampled)

# slow-json-stringify is +173.09% faster

```

## much-props-big-text 

```bash
native x 19,760 ops/sec ±0.80% (84 runs sampled)
fast-json-stringify x 18,744 ops/sec ±0.78% (93 runs sampled)
slow-json-stringify x 3,195,613 ops/sec ±0.44% (95 runs sampled)

# slow-json-stringify is +16072.13% faster

```

## big-text 

```bash
native x 252,588 ops/sec ±0.52% (92 runs sampled)
fast-json-stringify x 263,067 ops/sec ±0.53% (94 runs sampled)
slow-json-stringify x 57,227,748 ops/sec ±0.65% (90 runs sampled)

# slow-json-stringify is +21654.14% faster

```

## big-array-short-text 

```bash
native x 4,381 ops/sec ±0.40% (96 runs sampled)
slow-json-stringify x 10,782 ops/sec ±0.37% (96 runs sampled)

# slow-json-stringify is +146.09% faster

```

## big-array-long-text 

```bash
native x 95.06 ops/sec ±0.73% (80 runs sampled)
slow-json-stringify x 10,981 ops/sec ±0.37% (96 runs sampled)

# slow-json-stringify is +11458.95% faster

```

## big-array-long-number 

```bash
native x 1,145 ops/sec ±0.35% (94 runs sampled)
slow-json-stringify x 3,746 ops/sec ±0.95% (93 runs sampled)

# slow-json-stringify is +227.16% faster

```

## undefined properties 

```bash
native x 2,366,286 ops/sec ±0.16% (95 runs sampled)
fast-json-stringify x 7,097,273 ops/sec ±0.19% (94 runs sampled)
slow-json-stringify x 18,652,897 ops/sec ±0.38% (94 runs sampled)

# slow-json-stringify is +162.82% faster

```

