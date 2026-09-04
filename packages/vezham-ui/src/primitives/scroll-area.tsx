'use client';

import { ScrollShadow } from '@vezham/react-v3/scroll-shadow';
import type { PrimitiveProps } from './shared';
import { getClassName, renderPrimitive } from './shared';

const ScrollShadowPrimitive = ScrollShadow as any;

export function Root({ className, ...props }: Root.Props) {
  return <div className={getClassName(className, {})} {...props} />;
}
export namespace Root {
  export type Props = PrimitiveProps;
}

export function Viewport({ className, ...props }: Viewport.Props) {
  return <ScrollShadowPrimitive className={getClassName(className, {})} {...props} />;
}
export namespace Viewport {
  export type Props = PrimitiveProps;
}

export function Scrollbar({ orientation: _, ...props }: Scrollbar.Props) {
  return renderPrimitive('div', props, { hovering: false });
}
export namespace Scrollbar {
  export type Props = PrimitiveProps & {
    orientation?: 'vertical' | 'horizontal';
  };
}

export function Thumb(props: Thumb.Props) {
  return renderPrimitive('div', props);
}
export namespace Thumb {
  export type Props = PrimitiveProps;
}

export function Corner(props: Corner.Props) {
  return renderPrimitive('div', props);
}
export namespace Corner {
  export type Props = PrimitiveProps;
}
