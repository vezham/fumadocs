import { baseOptions } from '@/lib/layout.shared';
import { HomeLayout } from '@vezham/docs-react/layouts/home';
import { DefaultNotFound } from '@vezham/docs-react/layouts/home/not-found';

export function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <DefaultNotFound />
    </HomeLayout>
  );
}
