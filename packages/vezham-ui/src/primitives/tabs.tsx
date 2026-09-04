'use client';

import { Tabs } from '@vezham/react-v3/tabs';
import type { PrimitiveProps } from './shared';
import { getClassName } from './shared';

const TabsPrimitive = Tabs as any;

export function Root({ className, value, onValueChange, ...props }: Root.Props) {
  return (
    <TabsPrimitive
      className={getClassName(className, {})}
      selectedKey={value}
      onSelectionChange={(key: string | number) => onValueChange?.(String(key))}
      {...props}
    />
  );
}
export namespace Root {
  export type Props = PrimitiveProps & {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
  };
}

export function List({ className, ...props }: List.Props) {
  return <TabsPrimitive.List className={getClassName(className, {})} {...props} />;
}
export namespace List {
  export type Props = PrimitiveProps;
}

export function Tab({ className, ...props }: Tab.Props) {
  return <TabsPrimitive.Tab className={getClassName(className, {})} {...props} />;
}
export namespace Tab {
  export type Props = PrimitiveProps & {
    value?: string;
  };
}

export function Panel({ className, ...props }: Panel.Props) {
  return <TabsPrimitive.Panel className={getClassName(className, {})} {...props} />;
}
export namespace Panel {
  export type Props = PrimitiveProps & {
    keepMounted?: boolean;
    value: string;
  };
}
