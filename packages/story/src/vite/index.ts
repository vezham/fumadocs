import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { createControlsProject, getStoryClientModes } from '@/utils/generate';
import { transformStoryFile } from '@/utils/transform';
import type { Project } from '@/utils/generate';

export interface StoryPluginOptions {
  /**
   * Path to `tsconfig.json`.
   *
   * @default "tsconfig.json"
   */
  tsconfigPath?: string;

  /**
   * Filter story files to transform by id (regex)
   *
   * @default `/\.story\.(js|jsx|ts|tsx)$/`
   */
  filter?: RegExp;
}

export default function story(pluginOptions: StoryPluginOptions = {}): Plugin {
  const { filter = /\.story\.(js|jsx|ts|tsx)$/ } = pluginOptions;
  let tsconfigPath: string;
  let projectPromise: Promise<Project> | undefined;

  return {
    name: 'fumadocs:story',
    enforce: 'pre',
    configResolved(resolved) {
      tsconfigPath = pluginOptions.tsconfigPath ?? path.join(resolved.root, 'tsconfig.json');
    },
    transform: {
      filter: { id: filter },
      async handler(code, id) {
        projectPromise ??= createControlsProject(tsconfigPath);

        return transformStoryFile(
          getStoryClientModes('vite', fileURLToPath(new URL('./client.js', import.meta.url))),
          code,
          id,
          await projectPromise,
        );
      },
    },
  };
}
