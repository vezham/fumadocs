## @vx-oss/docs-local-md@0.3.4

## 1.0.7

### Patch Changes

- [`9119a0b`](https://github.com/vezham/fumadocs/commit/9119a0b3a54e0ef96724909c4100eb05f350fa4a) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`9119a0b`](https://github.com/vezham/fumadocs/commit/9119a0b3a54e0ef96724909c4100eb05f350fa4a)]:
  - @vx-oss/docs-local-content@1.0.7

## 1.0.6

### Patch Changes

- [`38e3b1f`](https://github.com/vezham/fumadocs/commit/38e3b1f5f78c5bfce7894cdcf2e7dd9a3ac15f9f) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`38e3b1f`](https://github.com/vezham/fumadocs/commit/38e3b1f5f78c5bfce7894cdcf2e7dd9a3ac15f9f)]:
  - @vx-oss/docs-local-content@1.0.6

## 1.0.5

### Patch Changes

- [`ef9e130`](https://github.com/vezham/fumadocs/commit/ef9e1305b6396e77e110e2d1ddddca7be4ef3b51) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`ef9e130`](https://github.com/vezham/fumadocs/commit/ef9e1305b6396e77e110e2d1ddddca7be4ef3b51)]:
  - @vx-oss/docs-local-content@1.0.5

## 1.0.4

### Patch Changes

- [`ba2428c`](https://github.com/vezham/fumadocs/commit/ba2428c7184ef00307043e93cc844534736fa24b) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`ba2428c`](https://github.com/vezham/fumadocs/commit/ba2428c7184ef00307043e93cc844534736fa24b)]:
  - @vx-oss/docs-local-content@1.0.4

## 1.0.3

### Patch Changes

- [`2500600`](https://github.com/vezham/fumadocs/commit/25006003a3ca66348183334d34f21885ce02bee9) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`2500600`](https://github.com/vezham/fumadocs/commit/25006003a3ca66348183334d34f21885ce02bee9)]:
  - @vx-oss/docs-local-content@1.0.3

## 1.0.2

### Patch Changes

- [`fe2966f`](https://github.com/vezham/fumadocs/commit/fe2966fbf1dcaf02b677679fde50f253de87b569) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bomp

- Updated dependencies [[`fe2966f`](https://github.com/vezham/fumadocs/commit/fe2966fbf1dcaf02b677679fde50f253de87b569)]:
  - @vx-oss/docs-local-content@1.0.2

### Read structured data from `page.data.structuredData()`

Search indexing no longer falls back to `(await page.data.load()).structuredData`. Runtime content sources expose `structuredData()` on page data instead, sharing the compile with `load()`:

```ts
const structuredData = await page.data.structuredData();
```

The renderer returned by `load()` still carries `structuredData`, existing code keeps working.

## @vx-oss/docs-local-md@0.3.1

### Improve performance

Fixed cache misses and edge cases.

### Extract shared local content source logic to `@vx-oss/docs-local-content`

## @vx-oss/docs-local-md@0.3.0

### Default to Base UI

Internal packages & templates now use Base UI rather than Radix UI.

## @vx-oss/docs-local-md@0.2.4

### Fix deprecation warnings

Address https://github.com/fuma-nama/fumadocs/issues/3380.

# @vx-oss/docs-local-md

## 0.2.3

### Patch Changes

- 42f0255: Support `invalidate` & `revalidate` on dynamic loader
- Updated dependencies [42f0255]
- Updated dependencies [a807798]
  - fumadocs-core@16.9.3

## 0.2.2

### Patch Changes

- 1fb6a61: Support custom base directory for content sources

## 0.2.1

### Patch Changes

- 79d3209: fix `icon` & `_openapi` page data locations
- Updated dependencies [79d3209]
  - fumadocs-core@16.8.5

## 0.2.0

### Minor Changes

- 4f9bd3e: support non-RSC usage

## 0.1.3

### Patch Changes

- 0e8405a: fix file watcher pattern matching
  - fumadocs-core@16.8.2

## 0.1.2

### Patch Changes

- 9aac45a: include types for compiler options

## 0.1.1

### Patch Changes

- 974b093: Support custom options for built-in plugins
  - fumadocs-core@16.8.1

## 0.1.0

### Minor Changes

- 0e2b5b6: Initial release
