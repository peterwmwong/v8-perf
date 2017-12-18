
    > # Usage: node runner.js [BEFORE_D8] [AFTER_D8]
    > node runner.js /p/google4/v8/out.gn/x64.release/d8 /p/google/v8/out.gn/x64.release/d8

## Results

| Method   | Before (ms)   | After (ms)   | Improvement |
|----------|---------------|--------------|-------------|
| new WeakMap(keyValues) | 311.99 | 83.22 | 3.75 |
| new WeakSet(keys) | 299.36 | 67.93 | 4.41 |
| new Map(keyValues) | 503.67 | 143.19 | 3.52 |
| new Set(keys) | 199.74 | 113.44 | 1.76 |
| weakMap.delete(key) | 216.43 | 78.74 | 2.75 |
| weakSet.delete(key) | 218.11 | 76.14 | 2.86 |
| weakMap.set(key, value) | 509.57 | 214.24 | 2.38 |
| weakSet.add(key) | 465.16 | 187.69 | 2.48 |
