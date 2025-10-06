import Link from 'fumadocs-core/link';
import type {
  AnchorHTMLAttributes,
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  TableHTMLAttributes,
} from 'react';
import { Image as FrameworkImage } from 'fumadocs-core/framework';
import { Card, Cards } from '@/components/card';
import { Callout } from '@/components/callout';
import { Heading } from '@/components/heading';
import { cn } from '@/utils/cn';
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from '@/components/codeblock';

function Image(
  props: ImgHTMLAttributes<HTMLImageElement> & {
    sizes?: string;
  },
) {
  return (
    <FrameworkImage
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
      {...props}
      src={props.src as unknown as string}
      className={cn('rounded-lg', props.className)}
    />
  );
}

function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative overflow-auto prose-no-margin my-6">
      <table {...props} />
    </div>
  );
}

const defaultMdxComponents = {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
  Card,
  Cards,
  a: Link as FC<AnchorHTMLAttributes<HTMLAnchorElement>>,
  img: Image,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <div>
      FROM @vezham/mdx/h1
      <Heading as="h1" {...props} />
    </div>
    // <Heading as="h1" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <div>
      FROM @vezham/mdx/h2
      <Heading as="h2" {...props} />
    </div>
    // <Heading as="h2" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <div>
      FROM @vezham/mdx/h3
      <Heading as="h3" {...props} />
    </div>
    // <Heading as="h3" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <div>
      FROM @vezham/mdx/h4
      <Heading as="h4" {...props} />
    </div>
    // <Heading as="h4" {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <div>
      FROM @vezham/mdx/h5
      <Heading as="h5" {...props} />
    </div>
    // <Heading as="h5" {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <div>
      FROM @vezham/mdx/h6
      <Heading as="h6" {...props} />
    </div>
    // <Heading as="h6" {...props} />
  ),
  table: Table,
  Callout,
};

export const createRelativeLink: typeof import('./mdx.server').createRelativeLink =
  () => {
    throw new Error(
      '`createRelativeLink` is only supported in Node.js environment',
    );
  };

export { defaultMdxComponents as default };
