import picomatch from 'picomatch';

export interface MacroOptions {
  /**
   * Patterns of modules that may use the macro API, relative to the project root.
   * `node_modules` is always excluded.
   *
   * @defaultValue all JS/TS files
   */
  include?: string | string[];
}

/**
 * `false` disables the macro API.
 */
export type MacroPluginOption = MacroOptions | false;

export const MacroModuleId = '@vx-oss/docs-mdx/macro';
export const VezhamMacroModuleId = '@vezham/docs-mdx/macro';
export const MacroModuleIds = [MacroModuleId, VezhamMacroModuleId] as const;
export const MacroRuntimeModuleIds = {
  [MacroModuleId]: '@vx-oss/docs-mdx/runtime/macro',
  [VezhamMacroModuleId]: '@vezham/docs-mdx/runtime/macro',
} as const;
export const MacroModuleIdPattern = /['"](?:@vx-oss|@vezham)\/docs-mdx\/macro['"]/;

export type MacroModuleIdValue = (typeof MacroModuleIds)[number];

export function isMacroModuleId(value: unknown): value is MacroModuleIdValue {
  return typeof value === 'string' && (MacroModuleIds as readonly string[]).includes(value);
}

export function hasMacroModuleId(code: string): boolean {
  return MacroModuleIds.some((id) => code.includes(id));
}

export function getMacroRuntimeModuleId(moduleId: MacroModuleIdValue): string {
  return MacroRuntimeModuleIds[moduleId];
}

export interface ResolvedMacroOptions {
  include: string[];
  exclude: string[];
}

/**
 * One pattern per extension: brace expansion (`*.{js,ts}`) isn't understood by every glob engine
 * these are handed to (Turbopack rule keys in particular).
 */
const DefaultInclude = ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.mts'];

const DefaultExclude = ['**/node_modules/**'];

export function createMacroMatcher({
  include,
  exclude,
}: ResolvedMacroOptions): (path: string) => boolean {
  const isIncluded = picomatch(include, { basename: true, windows: true });
  const isExcluded = picomatch(exclude, { windows: true });

  return (path) => !isExcluded(path) && isIncluded(path);
}

/**
 * @returns `undefined` when the macro API is disabled.
 */
export function resolveMacroOptions(
  option: MacroPluginOption | undefined,
): ResolvedMacroOptions | undefined {
  if (option === false) return;
  const { include = DefaultInclude } = option ?? {};

  return {
    include: typeof include === 'string' ? [include] : include,
    exclude: DefaultExclude,
  };
}
