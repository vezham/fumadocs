import defaultMdxComponents from '@vx-oss/docs-react/mdx';
import * as FilesComponents from '@vx-oss/docs-react/components/files';
import * as TabsComponents from '@vx-oss/docs-react/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from '@vx-oss/docs-react/components/accordion';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion,
    Accordions,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
