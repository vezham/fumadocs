import { baseOptions } from '@/lib/layout.shared';
import { HomeLayout } from '@vx-oss/docs-react/layouts/home';
import { DefaultNotFound } from '@vx-oss/docs-react/layouts/home/not-found';

export function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <DefaultNotFound />
    </HomeLayout>
  );
}
