'use client';

import { Disclosure } from '@vezham/react-v3/disclosure';
import type { PrimitiveProps } from './shared';
import { getClassName } from './shared';

const DisclosurePrimitive = Disclosure as any;

export function Root({ className, open, onOpenChange, ...props }: Root.Props) {
  return (
    <DisclosurePrimitive
      className={getClassName(className, { open })}
      isExpanded={open}
      onExpandedChange={onOpenChange}
      {...props}
    />
  );
}
export namespace Root {
  export type Props = PrimitiveProps & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
}

export function Trigger({ className, ...props }: Trigger.Props) {
  return <DisclosurePrimitive.Trigger className={getClassName(className, {})} {...props} />;
}
export namespace Trigger {
  export type Props = PrimitiveProps;
}

export function Panel({ className, ...props }: Panel.Props) {
  return <DisclosurePrimitive.Content className={getClassName(className, {})} {...props} />;
}
export namespace Panel {
  export type Props = PrimitiveProps & {
    keepMounted?: boolean;
  };
}
