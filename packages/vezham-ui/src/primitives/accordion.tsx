'use client';

import { Accordion } from '@vezham/react-v3';
import type { PrimitiveProps } from './shared';
import { getClassName } from './shared';

const AccordionPrimitive = Accordion as any;

export function Root({ className, ...props }: Root.Props) {
  return <AccordionPrimitive className={getClassName(className, {})} {...props} />;
}
export namespace Root {
  export type Props = PrimitiveProps;
}

export function Item({ className, ...props }: Item.Props) {
  return <AccordionPrimitive.Item className={getClassName(className, {})} {...props} />;
}
export namespace Item {
  export type Props = PrimitiveProps;
}

export function Header({ className, ...props }: Header.Props) {
  return <AccordionPrimitive.Heading className={getClassName(className, {})} {...props} />;
}
export namespace Header {
  export type Props = PrimitiveProps;
}

export function Trigger({ className, ...props }: Trigger.Props) {
  return <AccordionPrimitive.Trigger className={getClassName(className, {})} {...props} />;
}
export namespace Trigger {
  export type Props = PrimitiveProps;
}

export function Panel({ className, ...props }: Panel.Props) {
  return <AccordionPrimitive.Panel className={getClassName(className, {})} {...props} />;
}
export namespace Panel {
  export type Props = PrimitiveProps;
}
