import { createFileRoute, notFound } from '@tanstack/react-router';
import { DocsLayout } from '@vx-oss/docs-react/layouts/docs';
import { createServerFn } from '@tanstack/react-start';
import { docs, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from '@vx-oss/docs-react/layouts/docs/page';
import defaultMdxComponents from '@vx-oss/docs-react/mdx';
import { baseOptions } from '@/lib/layout.shared';
import { useFumadocsLoader } from '@vx-oss/docs-core/source/client';
import { Suspense, use, type ComponentProps } from 'react';
import { openapi } from '@/lib/openapi';
import { OpenAPIPage } from '@/components/api-page';

type OpenAPIComponentProps = ComponentProps<typeof OpenAPIPage>;

export const Route = createFileRoute('/$lang/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const data = await loader({
      data: {
        slugs: params._splat?.split('/') ?? [],
        lang: params.lang,
      },
    });

    await docs.getPage(data.path)?.preload();
    return data;
  },
});

const loader = createServerFn({
  method: 'GET',
})
  .validator((params: { slugs: string[]; lang?: string }) => params)
  .handler(async ({ data: { slugs, lang } }) => {
    const page = source.getPage(slugs, lang);
    if (!page) throw notFound();

    return {
      path: page.path,
      pageTree: await source.serializePageTree(source.getPageTree(lang)),
      openapiData: await openapi.preloadOpenAPIPage(page),
    };
  });

function Content({
  path,
  openapiData,
}: {
  path: string;
  openapiData: Awaited<ReturnType<typeof openapi.preloadOpenAPIPage>>;
}) {
  const page = docs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);

  const { toc } = use(page.load());
  const MDX = page.body;

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            OpenAPIPage: (props: OpenAPIComponentProps) => (
              <OpenAPIPage {...openapiData} {...props} />
            ),
            APIPage: (props: OpenAPIComponentProps) => <OpenAPIPage {...openapiData} {...props} />,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

function Page() {
  const { lang } = Route.useParams();
  const data = useFumadocsLoader(Route.useLoaderData());

  return (
    <DocsLayout {...baseOptions(lang)} tree={data.pageTree}>
      <Suspense>
        <Content path={data.path} openapiData={data.openapiData} />
      </Suspense>
    </DocsLayout>
  );
}
