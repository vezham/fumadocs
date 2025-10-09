import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { openapi } from '@/src/lib/openapi';
import { APIPage } from 'fumadocs-openapi/ui';

export const getMDXComponents = (components?: MDXComponents): MDXComponents => ({
    ...defaultMdxComponents,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    ...components,
  })
