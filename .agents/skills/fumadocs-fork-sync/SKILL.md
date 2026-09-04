---
name: fumadocs-fork-sync
description: Use when working on this Vezham Fumadocs fork, especially package renaming, upstream syncs, changesets, create-app dependencies, or keeping vezham-ui aligned with base-ui.
---

# Fumadocs Fork Sync

This repo is a Vezham-maintained fork of Fumadocs. Preserve the fork's public package strategy and avoid drifting from upstream implementation unless the divergence is intentional.

## Package Names

- Real published workspace packages use `@vx-oss/docs-*`.
- Consumer-facing aliases may use `@vezham/docs-*` pointing to `npm:@vx-oss/docs-*`.
- Keep `@vx-oss/docs-react` as the public UI facade package.
- Keep `@vx-oss/docs-vezham-ui` as the implementation package.
- Do not reintroduce upstream package names such as `fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`, or `@fumadocs/*` for fork-owned packages.
- External packages that are not fork-owned can stay external, for example `@fumari/json-schema-ts` and `@fumari/sponsors`.

Common mappings:

```text
fumadocs-core        -> @vx-oss/docs-core
fumadocs-mdx         -> @vx-oss/docs-mdx
fumadocs-ui          -> @vx-oss/docs-react
fumadocs-twoslash    -> @vx-oss/docs-twoslash
@fumadocs/cli        -> @vx-oss/docs-cli
@fumadocs/local-md   -> @vx-oss/docs-local-md
@fumadocs/story      -> @vx-oss/docs-story
@fumadocs/tailwind   -> @vx-oss/docs-tailwind
@fumadocs/vite       -> @vx-oss/docs-vite
@fumadocs/shadcn     -> @vx-oss/docs-shadcn
@fumari/image-size   -> @vx-oss/docs-image-size
@fumari/stf          -> @vx-oss/docs-stf
```

## Dependency Rules

- In `peerDependencies`, internal packages matching `@vx-oss/docs-*` should use `"*"` to avoid release sync churn.
- In normal `dependencies` and `devDependencies`, keep workspace links such as `workspace:*` or `workspace:^` when the package is part of this monorepo.
- In repo-local apps and examples, keep internal `@vx-oss/docs-*` dependencies as `workspace:*` for local builds.
- Portable examples intended to run outside the workspace, such as `examples/stackblitz`, should use published ranges matching the current local release version.
- Create-app consumer templates may keep `@vezham/docs-*` import/package names where the generated user app should see the Vezham alias.
- `resolvePublicDependency` support in create-app is additional alias support; it should not force internal source code away from the real `@vx-oss/docs-*` package names.

## Metadata And Publishing

- Preserve fork repository metadata:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/vezham/fumadocs",
    "directory": "packages/<package-dir>"
  },
  "homepage": "https://vezham.com"
}
```

- This matters for npm provenance checks; upstream repository URLs can fail publish provenance validation.
- Publishable packages must not keep `"private": true`.
- CLI/bin package names should preserve the fork naming used by their tsdown config.

## Changesets

- Changesets for package-name/version migration should target the fork package names.
- Current Vezham package releases are kept in sync unless the user explicitly chooses otherwise.
- It is acceptable to set the fork packages to a shared baseline such as `1.0.0` or later synchronized version when doing the initial migration.

## Vezham UI

- `packages/vezham-ui` should carry the same implementation surface as `packages/base-ui`.
- Treat `vezham-ui/src` as a superset of `base-ui/src`: no source file should exist only in `base-ui/src` unless there is a deliberate upstream-only reason.
- Keep shared logic aligned with `base-ui`; differences should usually be package-name text or imports into Vezham primitives.
- `vezham-ui` intentionally adds a `src/primitives` adapter layer backed by `@vezham/react-v3`, which aliases `@heroui/react`.
- Keep `css/style.css` importing `@vezham/styles-v3`, which aliases `@heroui/styles`.
- Primitive adapters should import focused HeroUI/Vezham subpaths, for example:

```ts
import { Accordion } from '@vezham/react-v3/accordion';
import { Disclosure } from '@vezham/react-v3/disclosure';
import { Drawer } from '@vezham/react-v3/drawer';
import { Modal } from '@vezham/react-v3/modal';
import { Popover } from '@vezham/react-v3/popover';
import { ScrollShadow } from '@vezham/react-v3/scroll-shadow';
import { Tabs } from '@vezham/react-v3/tabs';
```

- Use a local alias only when the imported name would collide with a wrapper export, for example `Link as VezhamLink` in a file that exports its own `Link`.
- When comparing `base-ui` and `vezham-ui`, expected diffs include primitive imports, package-name strings, registry package names, `src/index.ts`, `src/primitives/*`, and Vezham style imports.

## Upstream Sync Workflow

- Fetch and merge upstream carefully; this fork often needs package-name remapping after upstream changes.
- Prefer upstream implementation for conflict resolution, then apply Vezham package names, repository metadata, alias rules, and `cn` utility naming.
- Regenerate `pnpm-lock.yaml` after package/dependency changes.
- Verify with focused package builds first when the changed surface is small. For `vezham-ui`, build `@vx-oss/docs-tailwind` before `@vx-oss/docs-vezham-ui` if CSS generation needs the tailwind package output.
