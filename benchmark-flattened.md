
> slow-json-stringify@2.0.1 benchmark /Users/luca.gesmundo/me/slow-json-stringify
> cd benchmark && sh run.sh


# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object 

```bash
native x 3,256,671 ops/sec ±0.64% (91 runs sampled)
fast-json-stringify x 46,090,717 ops/sec ±0.22% (95 runs sampled)
slow-json-stringify x 46,056,000 ops/sec ±0.65% (92 runs sampled)

# fast-json-stringify,slow-json-stringify is +0.08% faster

```

## small-array 

```bash
native x 272,422 ops/sec ±0.24% (96 runs sampled)
fast-json-stringify x 345,767 ops/sec ±0.44% (97 runs sampled)
slow-json-stringify x 959,721 ops/sec ±0.53% (89 runs sampled)

# slow-json-stringify is +177.56% faster

```

## nested-props-short-text 

```bash
native x 693,847 ops/sec ±0.43% (93 runs sampled)
fast-json-stringify x 3,258,606 ops/sec ±0.25% (94 runs sampled)
slow-json-stringify x 10,205,115 ops/sec ±0.96% (91 runs sampled)

# slow-json-stringify is +213.17% faster

```

## much-props-short-text 

```bash
native x 575,735 ops/sec ±1.03% (91 runs sampled)
fast-json-stringify x 724,984 ops/sec ±1.31% (89 runs sampled)
slow-json-stringify x 2,137,405 ops/sec ±0.75% (89 runs sampled)

# slow-json-stringify is +194.82% faster

```

## much-props-big-text 

```bash
native x 13,479 ops/sec ±4.24% (83 runs sampled)
fast-json-stringify x 13,100 ops/sec ±3.16% (83 runs sampled)
slow-json-stringify x 2,260,389 ops/sec ±1.37% (92 runs sampled)

# slow-json-stringify is +16670.95% faster

```

## big-text 

```bash
native x 192,588 ops/sec ±0.50% (89 runs sampled)
fast-json-stringify x 200,919 ops/sec ±0.69% (90 runs sampled)
slow-json-stringify x 44,768,200 ops/sec ±1.21% (91 runs sampled)

# slow-json-stringify is +22181.83% faster

```

## big-array-short-text 

```bash
native x 3,717 ops/sec ±0.49% (89 runs sampled)
slow-json-stringify x 8,777 ops/sec ±1.55% (89 runs sampled)

# slow-json-stringify is +136.13% faster

```

## big-array-long-text 

```bash
native x 76.69 ops/sec ±0.72% (74 runs sampled)
slow-json-stringify x 8,595 ops/sec ±0.58% (89 runs sampled)

# slow-json-stringify is +11209.21% faster

```

## big-array-long-number 

```bash
native x 871 ops/sec ±2.96% (85 runs sampled)
slow-json-stringify x 2,643 ops/sec ±1.39% (88 runs sampled)

# slow-json-stringify is +203.68% faster

```

## undefined properties 

```bash
native x 1,541,588 ops/sec ±6.02% (77 runs sampled)
fast-json-stringify x 8,287,034 ops/sec ±1.53% (91 runs sampled)
slow-json-stringify x 14,304,614 ops/sec ±1.23% (84 runs sampled)

# slow-json-stringify is +72.61% faster

```

