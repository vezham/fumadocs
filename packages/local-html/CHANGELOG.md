## @vx-oss/docs-local-html@0.1.2

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

## @vx-oss/docs-local-html@0.1.0

### New package: `@vx-oss/docs-local-html`

A content source for local HTML files. It integrates externally-produced HTML pages (exported decks, reports, agent-generated deliverables) into a Fumadocs site, adapting them to the docs theme: content is scoped to `<main>`/`<article>`, page chrome and scripts/styles are dropped, `class`/`style` attributes are removed so prose styling takes over, and headings get generated ids for TOC and search indexing.

Code blocks are highlighted with Shiki, configured through `rehypeCodeOptions` like `@vx-oss/docs-local-md` (`false` to skip it). The language comes from the block's `language-*` class, which now survives `adaptStyles`.

Hot reload works like `@vx-oss/docs-local-md`: `@vx-oss/docs-local-html/dev/vite` for Vite, or the bundled `local-html dev` server with `@vx-oss/docs-local-html/dev/ws` for everything else.
