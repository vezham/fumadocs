import type { PageProps } from 'waku/router';
import defaultMdxComponents from '@vezham/docs-react/mdx';
import { getPageImageUrl, getSource, type SourcePage } from '@/lib/source';
import { layoutConfig } from '@/layouts/config';
import { getConfigRuntime } from '@/config/load-runtime';
import { Card, Cards } from '@vezham/docs-react/components/card';
import { type CompileResult, createMarkdownCompiler, plugin } from '@/lib/md';
import { remarkHeading } from '@vezham/docs-core/mdx-plugins/remark-heading';
import { remarkGfm } from '@vezham/docs-core/mdx-plugins/remark-gfm';
import { remarkCodeTab } from '@vezham/docs-core/mdx-plugins/remark-code-tab';
import { remarkNpm } from '@vezham/docs-core/mdx-plugins/remark-npm';
import { rehypeCode } from '@vezham/docs-core/mdx-plugins/rehype-code';
import { rehypeToc } from '@vezham/docs-core/mdx-plugins';
import type { TOCItemType } from '@vezham/docs-core/toc';
import { Fragment } from 'react/jsx-runtime';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CodeBlock, Pre } from '@vezham/docs-react/components/codeblock';
import { remarkMdxMermaid } from '@vezham/docs-core/mdx-plugins/remark-mdx-mermaid';
import { Mermaid } from '@/components/mermaid';
import type { ComponentProps, ReactNode } from 'react';
import { Image } from '@/components/image';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@vezham/docs-react/components/ui/button';
import { MessageCircleIcon } from 'lucide-react';
import { isAISupported } from '@/lib/ai';

const compiler = createMarkdownCompiler({
  remarkPlugins: [
    remarkGfm,
    remarkMath,
    remarkMdxMermaid,
    plugin(remarkHeading, { generateToc: false }),
    plugin(remarkNpm, { persist: { id: 'package-manager' } }),
    remarkCodeTab,
  ],
  remarkRehypeOptions: {
    passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'],
  },
  rehypePlugins: [
    rehypeKatex,
    plugin(rehypeCode, { lazy: true, fallbackLanguage: 'text' }),
    plugin(rehypeToc, { exportToc: { as: 'data' } }),
  ],
});

function useMdxComponents(page: SourcePage) {
  function ServerImage({ src, ...rest }: ComponentProps<'img'>) {
    // resolve non-absolute src
    if (src && !URL.canParse(src)) {
      const params = new URLSearchParams();
      params.set('page', page.absolutePath!);
      params.set('project', page.data.project.dir);
      params.set('src', src);
      src = `/img?${params}`;
    }

    return <Image src={src} {...rest} />;
  }

  return {
    ...defaultMdxComponents,
    Mermaid,
    img: ServerImage,
  };
}

interface MdPresetComponents {
  layout: typeof import('@vezham/docs-react/layouts/docs') | typeof import('@vezham/docs-react/layouts/flux');
  page:
    | typeof import('@vezham/docs-react/layouts/docs/page')
    | typeof import('@vezham/docs-react/layouts/flux/page');
}

export default async function DocPage({ slugs }: PageProps<'/[...slugs]'>) {
  const config = await getConfigRuntime();
  const source = await getSource(config);
  const page = source.getPage(slugs);
  const mdPreset = config.layout.presets?.md ?? 'docs';
  let mdPresetComponents: MdPresetComponents;

  if (mdPreset === 'docs') {
    mdPresetComponents = {
      layout: await import('@vezham/docs-react/layouts/docs'),
      page: await import('@vezham/docs-react/layouts/docs/page'),
    };
  } else {
    mdPresetComponents = {
      layout: await import('@vezham/docs-react/layouts/flux'),
      page: await import('@vezham/docs-react/layouts/flux/page'),
    };
  }

  return <MdContent slugs={slugs} page={page} components={mdPresetComponents} />;
}

async function MdContent({
  slugs,
  page,
  components,
}: {
  slugs: string[];
  page?: SourcePage;
  components: MdPresetComponents;
}) {
  const config = await getConfigRuntime();
  const source = await getSource(config);
  const layout = layoutConfig(config);
  const { DocsLayout } = components.layout;
  const { DocsBody, DocsTitle, DocsPage, DocsDescription } = components.page;

  async function renderContainer(children: ReactNode) {
    const hasAI = await isAISupported();
    return (
      <DocsLayout {...await layout.docs()}>
        {hasAI && (
          <AISearch>
            <AISearchPanel />
            <AISearchTrigger
              position="float"
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  className: 'text-fd-muted-foreground rounded-2xl',
                }),
              )}
            >
              <MessageCircleIcon className="size-4.5" />
              Ask AI
            </AISearchTrigger>
          </AISearch>
        )}

        {children}
      </DocsLayout>
    );
  }

  if (!page) {
    if (slugs.length === 0) {
      return renderContainer(
        <DocsPage>
          <DocsTitle>Home</DocsTitle>
          <DocsDescription>
            You can see all Markdown files under the project directory.
          </DocsDescription>
          <Cards>
            {source.getPages().map((page) => {
              return (
                <Card key={page.path} title={page.data.title} href={page.url}>
                  <p>{page.data.description}</p>
                </Card>
              );
            })}
          </Cards>
        </DocsPage>,
      );
    }

    return renderContainer(
      <DocsPage>
        <DocsTitle>Not Found</DocsTitle>
        <DocsDescription>The page you are looking for does not exist.</DocsDescription>
      </DocsPage>,
    );
  }

  let compiled: CompileResult | undefined;
  try {
    compiled = await compiler.compile({
      path: page.absolutePath,
      cwd: page.data.project.dir,
      value: page.data.content,
    });
  } catch (e) {
    return renderContainer(
      <DocsPage>
        <DocsTitle>Failed to Compile</DocsTitle>
        {e instanceof Error ? (
          <>
            <DocsDescription>{e.message}</DocsDescription>
            {e.stack && (
              <CodeBlock>
                <Pre>{e.stack}</Pre>
              </CodeBlock>
            )}
          </>
        ) : (
          <DocsDescription>{String(e)}</DocsDescription>
        )}
      </DocsPage>,
    );
  }

  const mdxComponents = useMdxComponents(page);
  const toc = compiled.file.data.rehypeToc?.map((item): TOCItemType => ({
    ...item,
    title: compiler.render(
      {
        type: 'root',
        children: item.title.children,
      },
      compiled.file,
      mdxComponents,
    ),
  }));

  return renderContainer(
    <DocsPage toc={toc}>
      <title>{page.data.title}</title>
      <meta property="og:image" content={getPageImageUrl(page)} />
      <meta property="og:description" content={page.data.description} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <Fragment key={page.absolutePath}>{compiled.render(mdxComponents)}</Fragment>
      </DocsBody>
    </DocsPage>,
  );
}

export async function getConfig() {
  return {
    render: 'dynamic',
  } as const;
}
