## @vx-oss/docs-notion@0.2.2

## 1.0.3

### Patch Changes

- [`2500600`](https://github.com/vezham/fumadocs/commit/25006003a3ca66348183334d34f21885ce02bee9) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

## 1.0.2

### Patch Changes

- [`fe2966f`](https://github.com/vezham/fumadocs/commit/fe2966fbf1dcaf02b677679fde50f253de87b569) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bomp

### Simplify cache

## @vx-oss/docs-notion@0.2.1

### Remember verified file URLs in the Notion file handler

Every asset request cost between 2 and 34 Notion API calls, so a page with a handful of images tripped the rate limit with two concurrent visitors. The handler now remembers a verified signed URL per block until shortly before Notion's `expiry_time`.

### Do not cache rejected promises

The dynamic loader's `files()`, Notion's page `load()`, `createFromSource`'s index build, and Shiki factory init retry on the next call after a transient failure, instead of returning the same rejection forever.

## @vx-oss/docs-notion@0.2.0

### Support Notion integration

Use Notion as content source.
