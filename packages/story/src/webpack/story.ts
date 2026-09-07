import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { LoaderDefinitionFunction } from 'webpack';
import { createControlsProject, getStoryClientModes } from '@/utils/generate';
import { transformStoryFile } from '@/utils/transform';
import type { Project } from '@/utils/generate';

export interface StoryLoaderOptions {
  /**
   * Path to `tsconfig.json`.
   *
   * @default "tsconfig.json"
   */
  tsconfigPath?: string;
}

let projectPromise: Promise<Project> | undefined;

const loader: LoaderDefinitionFunction<StoryLoaderOptions> = function (source) {
  const callback = this.async();
  const options = this.getOptions();
  this.cacheable(true);

  const run = async () => {
    if (!projectPromise) {
      const resolvedTsconfig = options.tsconfigPath ?? path.join(this.rootContext, 'tsconfig.json');
      projectPromise = createControlsProject(resolvedTsconfig);
    }

    try {
      const transformed = transformStoryFile(
        getStoryClientModes('next', fileURLToPath(new URL('../next/client.js', import.meta.url))),
        source,
        this.resourcePath,
        await projectPromise!,
      );
      callback(undefined, transformed ?? source);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      callback(error);
    }
  };

  void run();
};

export default loader;
