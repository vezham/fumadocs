'use client';

import { Popover } from '@vezham/react-v3/popover';
import type { PrimitiveProps } from './shared';
import { getClassName, renderPrimitive } from './shared';

const PopoverPrimitive = Popover as any;

export function Root({ className, ...props }: Root.Props) {
  return <PopoverPrimitive className={getClassName(className, {})} {...props} />;
}
export namespace Root {
  export type Props = PrimitiveProps;
}

export function Trigger({ className, ...props }: Trigger.Props) {
  return <PopoverPrimitive.Trigger className={getClassName(className, {})} {...props} />;
}
export namespace Trigger {
  export type Props = PrimitiveProps;
}

export function Portal({ children }: Portal.Props) {
  return children;
}
export namespace Portal {
  export type Props = PrimitiveProps;
}

export function Positioner({ align: _, sideOffset, side, ...props }: Positioner.Props) {
  return (
    <PopoverPrimitive.Content
      offset={sideOffset}
      placement={side}
      className={getClassName(props.className, {})}
      {...props}
    />
  );
}
export namespace Positioner {
  export type Props = PrimitiveProps & {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
  };
}

export function Popup(props: Popup.Props) {
  return <PopoverPrimitive.Dialog className={getClassName(props.className, {})} {...props} />;
}
export namespace Popup {
  export type Props = PrimitiveProps;
}

export function Close(props: Close.Props) {
  return renderPrimitive('button', props);
}
export namespace Close {
  export type Props = PrimitiveProps;
}
