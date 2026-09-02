import { getSource } from '@/lib/source';
import { llms } from '@vx-oss/docs-core/source';

export const revalidate = false;

export async function GET() {
  const docs = await getSource();
  return new Response(llms(docs).index());
}
