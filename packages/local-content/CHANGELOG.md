## @vx-oss/docs-local-content@0.2.1

## 1.0.4

### Patch Changes

- [`ba2428c`](https://github.com/vezham/fumadocs/commit/ba2428c7184ef00307043e93cc844534736fa24b) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

## 1.0.3

### Patch Changes

- [`2500600`](https://github.com/vezham/fumadocs/commit/25006003a3ca66348183334d34f21885ce02bee9) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

## 1.0.2

### Patch Changes

- [`fe2966f`](https://github.com/vezham/fumadocs/commit/fe2966fbf1dcaf02b677679fde50f253de87b569) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bomp

### Simplify cache

## @vx-oss/docs-local-content@0.2.0

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

### Read files in bounded chunks during a cold scan

`getFiles()` awaits each chunk before starting the next, instead of starting the entire tree concurrently.

## @vx-oss/docs-local-content@0.1.2

### Obsidian content source v1

Render Obsidian vaults directly through static or dynamic Fumadocs sources, with lazy in-memory compilation and local content hot reload. Remove the old generated-file and remark-plugin integrations.

Resolve URL-encoded relative file links against their decoded source paths.

## @vx-oss/docs-local-content@0.1.1

### Extract shared local content source logic to `@vx-oss/docs-local-content`
