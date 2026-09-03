'use client';

import {
  cloneElement,
  createElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from 'react';

export type PrimitiveState = Record<string, unknown>;
export type PrimitiveClassName = string | ((state: PrimitiveState) => string | undefined);
export type PrimitiveRender =
  | ReactElement
  | ((props: Record<string, unknown>, state: PrimitiveState) => ReactElement);

export interface PrimitiveProps {
  children?: ReactNode;
  className?: PrimitiveClassName;
  render?: PrimitiveRender;
  ref?: unknown;
  [key: string]: unknown;
}

export function getClassName(className: PrimitiveClassName | undefined, state: PrimitiveState) {
  return typeof className === 'function' ? className(state) : className;
}

export function renderPrimitive(
  tag: ElementType,
  { className, render, ...props }: PrimitiveProps,
  state: PrimitiveState = {},
) {
  const elementProps = {
    ...props,
    className: getClassName(className, state),
  };

  if (typeof render === 'function') {
    return render(elementProps, state);
  }

  if (isValidElement(render)) {
    const element = render as ReactElement<ComponentPropsWithoutRef<'div'>>;
    const renderProps = element.props;

    return cloneElement(element, {
      ...elementProps,
      className: [renderProps.className, elementProps.className].filter(Boolean).join(' '),
      children: props.children ?? renderProps.children,
    });
  }

  return createElement(tag, elementProps);
}
