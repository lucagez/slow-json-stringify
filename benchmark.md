
# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 2,957,350 ops/sec ±2.52% (87 runs sampled)
fast-json-stringify x 17,535,904 ops/sec ±1.16% (87 runs sampled)
slow-json-stringify x 34,377,930 ops/sec ±1.02% (92 runs sampled)

# slow-json-stringify is +96.04% faster

```

## small-array 

```bash
native x 309,266 ops/sec ±0.74% (91 runs sampled)
fast-json-stringify x 290,804 ops/sec ±1.34% (87 runs sampled)
slow-json-stringify x 440,593 ops/sec ±0.71% (93 runs sampled)

# slow-json-stringify is +42.46% faster

```

## nested-props-short-text 

```bash
native x 872,665 ops/sec ±1.11% (92 runs sampled)
fast-json-stringify x 3,248,828 ops/sec ±1.10% (90 runs sampled)
slow-json-stringify x 5,026,073 ops/sec ±0.73% (93 runs sampled)

# slow-json-stringify is +54.70% faster

```

## much-props-short-text 

```bash
native x 689,272 ops/sec ±1.06% (91 runs sampled)
fast-json-stringify x 862,802 ops/sec ±0.88% (92 runs sampled)
slow-json-stringify x 1,252,150 ops/sec ±1.10% (88 runs sampled)

# slow-json-stringify is +45.13% faster

```

## much-props-big-text 

```bash
native x 17,224 ops/sec ±0.87% (92 runs sampled)
fast-json-stringify x 15,720 ops/sec ±0.96% (92 runs sampled)
slow-json-stringify x 1,361,023 ops/sec ±0.80% (91 runs sampled)

# slow-json-stringify is +7801.89% faster

```

## big-text 

```bash
native x 213,013 ops/sec ±0.68% (92 runs sampled)
fast-json-stringify x 218,695 ops/sec ±0.94% (89 runs sampled)
slow-json-stringify x 35,570,745 ops/sec ±0.83% (89 runs sampled)

# slow-json-stringify is +16165.08% faster

```

## big-array-short-text 

```bash
native x 3,315 ops/sec ±0.74% (92 runs sampled)
slow-json-stringify x 4,409 ops/sec ±1.07% (92 runs sampled)

# slow-json-stringify is +33.00% faster

```

## big-array-long-text 

```bash
native x 86.08 ops/sec ±0.97% (73 runs sampled)
slow-json-stringify x 375 ops/sec ±0.66% (90 runs sampled)

# slow-json-stringify is +334.88% faster

```

## big-array-long-number 

```bash
native x 949 ops/sec ±0.70% (94 runs sampled)
slow-json-stringify x 2,258 ops/sec ±1.56% (90 runs sampled)

# slow-json-stringify is +138.19% faster

```

