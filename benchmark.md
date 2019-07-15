
# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 2,957,167 ops/sec ±2.51% (79 runs sampled)
fast-json-stringify x 17,094,006 ops/sec ±1.84% (82 runs sampled)
slow-json-stringify x 40,921,073 ops/sec ±1.94% (84 runs sampled)

# slow-json-stringify is +139.39% faster

```

## small-array 

```bash
native x 322,311 ops/sec ±1.55% (90 runs sampled)
fast-json-stringify x 366,088 ops/sec ±1.35% (86 runs sampled)
slow-json-stringify x 1,250,231 ops/sec ±1.83% (84 runs sampled)

# slow-json-stringify is +241.51% faster

```

## nested-props-short-text 

```bash
native x 887,506 ops/sec ±1.76% (90 runs sampled)
fast-json-stringify x 3,237,814 ops/sec ±1.92% (86 runs sampled)
slow-json-stringify x 12,250,987 ops/sec ±2.01% (81 runs sampled)

# slow-json-stringify is +278.37% faster

```

## much-props-short-text 

```bash
native x 705,128 ops/sec ±1.84% (90 runs sampled)
fast-json-stringify x 855,758 ops/sec ±1.44% (91 runs sampled)
slow-json-stringify x 2,701,362 ops/sec ±2.01% (86 runs sampled)

# slow-json-stringify is +215.67% faster

```

## much-props-big-text 

```bash
native x 17,860 ops/sec ±1.42% (86 runs sampled)
fast-json-stringify x 15,799 ops/sec ±1.48% (91 runs sampled)
slow-json-stringify x 3,100,619 ops/sec ±1.59% (93 runs sampled)

# slow-json-stringify is +17260.69% faster

```

## big-text 

```bash
native x 216,288 ops/sec ±1.34% (90 runs sampled)
fast-json-stringify x 221,585 ops/sec ±1.60% (83 runs sampled)
slow-json-stringify x 42,421,565 ops/sec ±1.88% (86 runs sampled)

# slow-json-stringify is +19044.60% faster

```

## big-array-short-text 

```bash
native x 3,325 ops/sec ±1.33% (91 runs sampled)
slow-json-stringify x 11,127 ops/sec ±1.75% (88 runs sampled)

# slow-json-stringify is +234.62% faster

```

## big-array-long-text 

```bash
native x 89.21 ops/sec ±1.38% (76 runs sampled)
slow-json-stringify x 11,328 ops/sec ±1.74% (91 runs sampled)

# slow-json-stringify is +12628.09% faster

```

## big-array-long-number 

```bash
native x 896 ops/sec ±1.57% (90 runs sampled)
slow-json-stringify x 2,881 ops/sec ±1.94% (88 runs sampled)

# slow-json-stringify is +221.54% faster

```

## undefined properties 

```bash
native x 2,965,285 ops/sec ±2.03% (91 runs sampled)
fast-json-stringify x 17,271,819 ops/sec ±1.67% (87 runs sampled)
slow-json-stringify x 21,920,745 ops/sec ±1.37% (91 runs sampled)

# slow-json-stringify is +26.92% faster

```

