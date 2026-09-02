import type { Route } from './+types/search';
import { createFromSource } from '@vx-oss/docs-core/search/server';
import { source } from '@/lib/source';

const server = createFromSource(source, {
  language: 'english',
});

export async function loader({ request }: Route.LoaderArgs) {
  return server.GET(request);
}
