
# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 3,010,761 ops/sec ±2.32% (84 runs sampled)
fast-json-stringify x 14,816,139 ops/sec ±3.18% (78 runs sampled)
slow-json-stringify x 40,887,073 ops/sec ±2.45% (81 runs sampled)

# slow-json-stringify is +175.96% faster

```

## small-array 

```bash
native x 299,066 ops/sec ±2.16% (86 runs sampled)
fast-json-stringify x 373,466 ops/sec ±1.40% (87 runs sampled)
slow-json-stringify x 521,940 ops/sec ±1.69% (89 runs sampled)

# slow-json-stringify is +39.76% faster

```

## nested-props-short-text 

```bash
native x 809,232 ops/sec ±1.81% (89 runs sampled)
fast-json-stringify x 3,316,635 ops/sec ±1.22% (90 runs sampled)
slow-json-stringify x 6,659,674 ops/sec ±0.99% (89 runs sampled)

# slow-json-stringify is +100.80% faster

```

## much-props-short-text 

```bash
native x 680,489 ops/sec ±1.63% (88 runs sampled)
fast-json-stringify x 809,106 ops/sec ±2.52% (79 runs sampled)
slow-json-stringify x 1,816,320 ops/sec ±2.14% (87 runs sampled)

# slow-json-stringify is +124.48% faster

```

## much-props-big-text 

```bash
native x 15,345 ops/sec ±1.51% (83 runs sampled)
fast-json-stringify x 15,534 ops/sec ±1.76% (84 runs sampled)
slow-json-stringify x 1,979,565 ops/sec ±2.81% (82 runs sampled)

# slow-json-stringify is +12643.43% faster

```

## big-text 

```bash
native x 190,580 ops/sec ±1.92% (85 runs sampled)
fast-json-stringify x 216,715 ops/sec ±1.76% (84 runs sampled)
slow-json-stringify x 42,176,195 ops/sec ±2.12% (86 runs sampled)

# slow-json-stringify is +19361.68% faster

```

## big-array-short-text 

```bash
native x 2,951 ops/sec ±2.05% (82 runs sampled)
slow-json-stringify x 5,012 ops/sec ±1.75% (88 runs sampled)

# slow-json-stringify is +69.86% faster

```

## big-array-long-text 

```bash
native x 86.12 ops/sec ±1.40% (74 runs sampled)
slow-json-stringify x 335 ops/sec ±1.47% (83 runs sampled)

# slow-json-stringify is +288.37% faster

```

## big-array-long-number 

```bash
native x 916 ops/sec ±1.06% (93 runs sampled)
slow-json-stringify x 2,421 ops/sec ±1.83% (89 runs sampled)

# slow-json-stringify is +164.30% faster

```

