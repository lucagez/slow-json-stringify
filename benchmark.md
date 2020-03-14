
> slow-json-stringify@1.0.1 benchmark /Users/luca.gesmundo/me/slow-json-stringify
> cd benchmark && sh run.sh


# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 3,052,235 ops/sec ±0.48% (91 runs sampled)
fast-json-stringify x 17,209,151 ops/sec ±0.52% (92 runs sampled)
slow-json-stringify x 40,772,165 ops/sec ±0.74% (91 runs sampled)

# slow-json-stringify is +136.92% faster

```

## small-array 

```bash
native x 334,412 ops/sec ±0.54% (91 runs sampled)
fast-json-stringify x 398,016 ops/sec ±0.55% (97 runs sampled)
slow-json-stringify x 1,196,859 ops/sec ±0.32% (96 runs sampled)

# slow-json-stringify is +200.71% faster

```

## nested-props-short-text 

```bash
native x 973,793 ops/sec ±0.78% (91 runs sampled)
fast-json-stringify x 3,610,689 ops/sec ±0.92% (94 runs sampled)
slow-json-stringify x 9,999,429 ops/sec ±0.70% (89 runs sampled)

# slow-json-stringify is +176.94% faster

```

## much-props-short-text 

```bash
native x 730,940 ops/sec ±0.71% (90 runs sampled)
fast-json-stringify x 974,364 ops/sec ±0.49% (96 runs sampled)
slow-json-stringify x 2,363,624 ops/sec ±0.73% (91 runs sampled)

# slow-json-stringify is +142.58% faster

```

## much-props-big-text 

```bash
native x 14,427 ops/sec ±0.32% (91 runs sampled)
fast-json-stringify x 13,725 ops/sec ±0.62% (96 runs sampled)
slow-json-stringify x 2,581,437 ops/sec ±0.47% (94 runs sampled)

# slow-json-stringify is +17793.10% faster

```

## big-text 

```bash
native x 185,695 ops/sec ±0.42% (94 runs sampled)
fast-json-stringify x 190,925 ops/sec ±0.39% (95 runs sampled)
slow-json-stringify x 42,133,235 ops/sec ±0.53% (90 runs sampled)

# slow-json-stringify is +21967.95% faster

```

## big-array-short-text 

```bash
native x 3,635 ops/sec ±0.33% (92 runs sampled)
slow-json-stringify x 10,005 ops/sec ±0.48% (96 runs sampled)

# slow-json-stringify is +175.32% faster

```

## big-array-long-text 

```bash
native x 68.79 ops/sec ±0.44% (71 runs sampled)
slow-json-stringify x 10,261 ops/sec ±0.27% (93 runs sampled)

# slow-json-stringify is +14989.71% faster

```

## big-array-long-number 

```bash
native x 1,072 ops/sec ±0.89% (93 runs sampled)
slow-json-stringify x 3,512 ops/sec ±0.80% (94 runs sampled)

# slow-json-stringify is +227.61% faster

```

## undefined properties 

```bash
native x 2,037,503 ops/sec ±0.80% (90 runs sampled)
fast-json-stringify x 6,838,209 ops/sec ±0.40% (94 runs sampled)
slow-json-stringify x 16,059,999 ops/sec ±0.39% (92 runs sampled)

# slow-json-stringify is +134.86% faster

```

