import { createTypeTreeBuilder, literalEnumHandler } from '../type-tree/builder';
import type { TypeNode } from '../type-tree/types';
import { createProject, type Project } from './project';

export type { Project };

export async function createControlsProject(tsconfigPath: string): Promise<Project> {
  return createProject(tsconfigPath);
}

export type Mode = string;

export type ModeInput = Mode | readonly Mode[];

export const publicStoryClientModes = {
  next: ['@vezham/docs-story/next/client', '@vx-oss/docs-story/next/client'],
  vite: ['@vezham/docs-story/vite/client', '@vx-oss/docs-story/vite/client'],
} as const satisfies Record<'next' | 'vite', readonly Mode[]>;

export function getStoryClientModes(kind: keyof typeof publicStoryClientModes, clientPath?: string) {
  return clientPath ? [clientPath, ...publicStoryClientModes[kind]] : publicStoryClientModes[kind];
}

/**
 * The type alias declaration to append to story files, for resolving the props of a story.
 */
export function getControlsAlias(mode: Mode, exportName: string) {
  const name = `_StoryProps_${exportName}_`;

  return {
    name,
    code: `export type ${name} = import('${mode}').GetProps<typeof ${exportName}>;`,
  };
}

export type GeneratedControls = {
  controls: TypeNode;
  mode: Mode;
};

function isResolvedControls(node: TypeNode) {
  return node.type !== 'never';
}

function generateControlsForMode(
  mode: Mode,
  project: Project,
  filePath: string,
  exportName: string,
  content: string,
): GeneratedControls {
  const alias = getControlsAlias(mode, exportName);
  if (!content.includes(alias.code)) content = `${content}\n${alias.code}`;

  const loaded = project.getSourceFile(filePath, content);
  if (!loaded) throw new Error(`Failed to load "${filePath}" into TypeScript project`);

  const { project: tsProject, sourceFile } = loaded;
  const { checker } = tsProject;
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  const exports = moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : [];
  const declaration = exports
    .find((symbol) => symbol.name === alias.name)
    ?.declarations[0]?.resolve(tsProject);
  const type = declaration ? checker.getTypeAtLocation(declaration) : undefined;

  if (!declaration || !type || !exports.some((symbol) => symbol.name === exportName)) {
    throw new Error(`Export "${exportName}" not found in file "${filePath}"`);
  }

  return {
    controls: createTypeTreeBuilder(tsProject, [literalEnumHandler]).typeToNode(type, declaration),
    mode,
  };
}

/**
 * Generate controls for an exported story, also returning the mode that resolved its types.
 *
 * @param content - content of the story file, the alias declaration of `getControlsAlias()` is appended when missing.
 */
export function generateControlsWithMode(
  mode: ModeInput,
  project: Project,
  filePath: string,
  exportName: string,
  content: string,
): GeneratedControls {
  const modes = typeof mode === 'string' ? [mode] : mode;
  let fallback: GeneratedControls | undefined;
  let firstError: unknown;

  for (const item of modes) {
    try {
      const generated = generateControlsForMode(item, project, filePath, exportName, content);

      if (isResolvedControls(generated.controls)) {
        return generated;
      }

      fallback ??= generated;
    } catch (error) {
      firstError ??= error;
    }
  }

  if (fallback) {
    return fallback;
  }

  if (firstError) {
    throw firstError;
  }

  throw new Error(`Export "${exportName}" not found in file "${filePath}"`);
}

/**
 * Generate controls for an exported story.
 *
 * @param content - content of the story file, the alias declaration of `getControlsAlias()` is appended when missing.
 */
export function generateControls(
  mode: ModeInput,
  project: Project,
  filePath: string,
  exportName: string,
  content: string,
): TypeNode {
  return generateControlsWithMode(mode, project, filePath, exportName, content).controls;
}
