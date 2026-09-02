import { source } from '@/lib/source';
import { llms } from '@vx-oss/docs-core/source';

export function loader() {
  return new Response(llms(source).index());
}
