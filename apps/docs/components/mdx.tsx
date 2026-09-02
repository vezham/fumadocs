import defaultMdxComponents from '@vezham/docs-react/mdx';
import * as FilesComponents from '@vezham/docs-react/components/files';
import * as TabsComponents from '@vezham/docs-react/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from '@vezham/docs-react/components/accordion';

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
