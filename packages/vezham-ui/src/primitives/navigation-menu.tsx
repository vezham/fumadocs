'use client';

import { Link as HeroLink } from '@vezham/react-v3';
import type { PrimitiveProps } from './shared';
import { getClassName, renderPrimitive } from './shared';

const LinkPrimitive = HeroLink as any;

export function Root({ className, ...props }: Root.Props) {
  return <nav className={getClassName(className, { open: false })} {...props} />;
}
export namespace Root {
  export type Props = PrimitiveProps;
}

export function List(props: List.Props) {
  return renderPrimitive('ul', props);
}
export namespace List {
  export type Props = PrimitiveProps;
}

export function Item(props: Item.Props) {
  return renderPrimitive('li', props);
}
export namespace Item {
  export type Props = PrimitiveProps;
}

export function Trigger(props: Trigger.Props) {
  return renderPrimitive('button', props, { open: false });
}
export namespace Trigger {
  export type Props = PrimitiveProps;
}

export function Content(props: Content.Props) {
  return renderPrimitive('div', props);
}
export namespace Content {
  export type Props = PrimitiveProps;
}

export function Link({ render, ...props }: Link.Props) {
  if (render) return renderPrimitive(LinkPrimitive, { render, ...props });

  return <LinkPrimitive {...props} />;
}
export namespace Link {
  export type Props = PrimitiveProps;
}

export function Portal({ children }: Portal.Props) {
  return children;
}
export namespace Portal {
  export type Props = PrimitiveProps;
}

export function Positioner({
  anchor: _,
  collisionPadding: __,
  side: ___,
  sideOffset: ____,
  ...props
}: Positioner.Props) {
  return renderPrimitive('div', props);
}
export namespace Positioner {
  export type Props = PrimitiveProps & {
    anchor?: unknown;
    collisionPadding?: unknown;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
  };
}

export function Popup(props: Popup.Props) {
  return renderPrimitive('div', props);
}
export namespace Popup {
  export type Props = PrimitiveProps;
}

export function Viewport(props: Viewport.Props) {
  return renderPrimitive('div', props);
}
export namespace Viewport {
  export type Props = PrimitiveProps;
}
