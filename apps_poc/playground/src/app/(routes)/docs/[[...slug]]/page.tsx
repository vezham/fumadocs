import { source } from '@/src/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@components/mdx';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async (props: Props) => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page)  notFound()

  const {toc, full, title, description, body: MDX} = page.data

  return (
    <DocsPage toc={toc} full={full}>
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export const generateStaticParams = async () => source.generateParams()

export const generateMetadata = async (props: Props) => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const {title, description} = page.data

  const image = ['/docs-og', ...(params.slug ?? []), 'image.png'].join('/');

  return {
    title,
    description,
    openGraph: {
      images: image,
    },
    twitter: {
      card: 'summary_large_image',
      images: image,
    },
  } satisfies Metadata;
}