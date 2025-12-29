import { Link } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

type Types = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps<T extends Types> = Omit<ComponentPropsWithoutRef<T>, 'as'> & {
  as?: T;
};

export function Heading<T extends Types = 'h1'>({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const As = as ?? 'h1';

  if (!props.id) return <As className={className} {...props} />;

  return (
    <As
      className={cn(
        'flex flex-row scroll-m-28 items-center gap-2 group',
        className,
      )}
      {...props}
    >
      <div className="absolute">
        <Link
          aria-label="Link to section"
          className="-ml-5 flex items-center size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
      <a data-card="" href={`#${props.id}`}>
        {props.children}
      </a>
    </As>
  );
}
