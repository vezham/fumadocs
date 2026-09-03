'use client';

import { type ReactNode } from 'react';

export function DirectionProvider({ children, direction }: DirectionProvider.Props) {
  return <div dir={direction}>{children}</div>;
}

export namespace DirectionProvider {
  export type Props = {
    children?: ReactNode;
    direction?: 'ltr' | 'rtl';
  };
}
