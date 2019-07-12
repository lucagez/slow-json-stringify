
# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 3,386,393 ops/sec ±1.70% (87 runs sampled)
fast-json-stringify x 17,290,512 ops/sec ±2.62% (89 runs sampled)
slow-json-stringify x 46,997,949 ops/sec ±0.74% (92 runs sampled)

# slow-json-stringify is +171.81% faster

```

## small-array 

```bash
native x 335,289 ops/sec ±1.06% (90 runs sampled)
fast-json-stringify x 376,535 ops/sec ±0.76% (89 runs sampled)
slow-json-stringify x 1,295,332 ops/sec ±0.95% (91 runs sampled)

# slow-json-stringify is +244.01% faster

```

## nested-props-short-text 

```bash
native x 917,695 ops/sec ±1.16% (95 runs sampled)
fast-json-stringify x 3,316,950 ops/sec ±0.89% (91 runs sampled)
slow-json-stringify x 13,207,866 ops/sec ±1.05% (88 runs sampled)

# slow-json-stringify is +298.19% faster

```

## much-props-short-text 

```bash
native x 723,099 ops/sec ±1.19% (95 runs sampled)
fast-json-stringify x 865,882 ops/sec ±0.79% (92 runs sampled)
slow-json-stringify x 2,856,564 ops/sec ±0.95% (91 runs sampled)

# slow-json-stringify is +229.90% faster

```

## much-props-big-text 

```bash
native x 18,835 ops/sec ±0.85% (93 runs sampled)
fast-json-stringify x 16,657 ops/sec ±0.97% (95 runs sampled)
slow-json-stringify x 3,297,202 ops/sec ±0.75% (92 runs sampled)

# slow-json-stringify is +17406.65% faster

```

## big-text 

```bash
native x 231,221 ops/sec ±0.95% (92 runs sampled)
fast-json-stringify x 234,677 ops/sec ±0.97% (93 runs sampled)
slow-json-stringify x 48,744,139 ops/sec ±1.01% (86 runs sampled)

# slow-json-stringify is +20670.82% faster

```

## big-array-short-text 

```bash
native x 3,581 ops/sec ±0.84% (95 runs sampled)
slow-json-stringify x 11,344 ops/sec ±1.24% (91 runs sampled)

# slow-json-stringify is +216.84% faster

```

## big-array-long-text 

```bash
native x 91.42 ops/sec ±1.10% (78 runs sampled)
slow-json-stringify x 11,657 ops/sec ±0.82% (90 runs sampled)

# slow-json-stringify is +12709.89% faster

```

## big-array-long-number 

```bash
native x 961 ops/sec ±1.01% (92 runs sampled)
slow-json-stringify x 3,089 ops/sec ±1.53% (93 runs sampled)

# slow-json-stringify is +221.33% faster

```

