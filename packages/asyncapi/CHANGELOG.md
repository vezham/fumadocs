## @vx-oss/docs-asyncapi@0.3.0

## 1.0.5

### Patch Changes

- [`ef9e130`](https://github.com/vezham/fumadocs/commit/ef9e1305b6396e77e110e2d1ddddca7be4ef3b51) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`ef9e130`](https://github.com/vezham/fumadocs/commit/ef9e1305b6396e77e110e2d1ddddca7be4ef3b51)]:
  - @vx-oss/docs-api@1.0.5
  - @vx-oss/docs-stf@1.0.5

## 1.0.4

### Patch Changes

- [`ba2428c`](https://github.com/vezham/fumadocs/commit/ba2428c7184ef00307043e93cc844534736fa24b) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`ba2428c`](https://github.com/vezham/fumadocs/commit/ba2428c7184ef00307043e93cc844534736fa24b)]:
  - @vx-oss/docs-api@1.0.4
  - @vx-oss/docs-stf@1.0.4

## 1.0.3

### Patch Changes

- [`2500600`](https://github.com/vezham/fumadocs/commit/25006003a3ca66348183334d34f21885ce02bee9) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

- Updated dependencies [[`2500600`](https://github.com/vezham/fumadocs/commit/25006003a3ca66348183334d34f21885ce02bee9)]:
  - @vx-oss/docs-api@1.0.3
  - @vx-oss/docs-stf@1.0.3

## 1.0.2

### Patch Changes

- [`fe2966f`](https://github.com/vezham/fumadocs/commit/fe2966fbf1dcaf02b677679fde50f253de87b569) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bomp

- Updated dependencies [[`fe2966f`](https://github.com/vezham/fumadocs/commit/fe2966fbf1dcaf02b677679fde50f253de87b569)]:
  - @vx-oss/docs-api@1.0.2
  - @vx-oss/docs-stf@1.0.2

### Redesign source API

Content sources can hook into the static loader they are attached to, and dynamic sources can opt out of the loader's in-memory file cache.

`configureStatic` runs when a source is attached to `loader()`, and again whenever `dynamicLoader()` builds a new static loader:

```ts
export function createMySource(): DynamicSource {
  return {
    cache: "custom",
    async files() {
      return loadFiles();
    },
    configureStatic({ loader, source }) {
      // `loader` is the created static loader
      // `source` is the record key when using named sources
    },
    configure(loader, { source }) {
      loader.invalidate();
    },
  };
}
```

- `cache: 'memory'` (default): `files()` is called once until `invalidate()`.
- `cache: 'custom'`: the source caches itself. `dynamicLoader()` re-runs `files()` on `get()` and rebuilds only when the file list is shallowly different (by identity).

### Integrations

GraphQL cross-links are generated from the attached loader instead of a `baseUrl` option on `staticSource()`. Local, OpenAPI, and AsyncAPI `dynamicSource()` use `cache: 'custom'` and reuse generated files by identity until `invalidate()`.

Sanity now uses `cache: 'custom'` when given a `sanityFetch` from `next-sanity/live`, calling `invalidate()` in draft mode is no longer needed.

### Cache the document proxy in `toStaticData`

Matches `fumadocs-openapi`: the magic proxy is created once per document instead of once per generated page.

## @vx-oss/docs-asyncapi@0.2.0

### Use `@scalar/json-magic` for dereferencing

This will affect all raw access to OpenAPI/AsyncAPI documents, ensure to use `dereferenceShallow()` public API.

### Migrate from `js-yaml` to `yaml`

## @vx-oss/docs-asyncapi@0.1.1

### Fix minor UI inconsistencies

More aligned with original styles.

## @vx-oss/docs-asyncapi@0.1.0

### Default to Base UI

Internal packages & templates now use Base UI rather than Radix UI.

## @vx-oss/docs-asyncapi@0.0.4

### Migrate to `cnfast`

Drop `tailwind-merge`.

# @vx-oss/docs-asyncapi

## 0.0.2

### Patch Changes

- 5017289: Use stable `fuma-translate`
- Updated dependencies [5017289]
- Updated dependencies [7a77722]
  - @vx-oss/docs-api@0.0.2
  - fumadocs-ui@16.10.1
  - fumadocs-core@16.10.1

## 0.0.1

### Patch Changes

- 74102c5: Implement
- Updated dependencies [9b9545f]
- Updated dependencies [0cc1fac]
- Updated dependencies [779efff]
  - fumadocs-core@16.10.0
  - fumadocs-ui@16.10.0
