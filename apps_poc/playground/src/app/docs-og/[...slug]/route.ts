import { generateOGImage } from 'fumadocs-ui/og';
import { source } from '@/src/lib/source';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string[] }> }

export const GET = async(_req: Request, { params }: Props) => {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const {title, description} = page.data

  return generateOGImage({
    title,
    description
  });
}

export const generateStaticParams = () => source.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, 'image.png'],
  }));
