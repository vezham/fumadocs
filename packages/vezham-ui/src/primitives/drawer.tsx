'use client';

import { Drawer } from '@vezham/react-v3';
import { createContext, use, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { PrimitiveProps } from './shared';
import { renderPrimitive } from './shared';

const DrawerPrimitive = Drawer as any;

export interface Handle<T = unknown> {
  close: () => void;
  open: () => void;
  setOpen?: (open: boolean) => void;
  value?: T;
}

export function createHandle<T = unknown>(): Handle<T> {
  return {
    close() {
      this.setOpen?.(false);
    },
    open() {
      this.setOpen?.(true);
    },
  };
}

const Context = createContext<{ open: boolean; onOpenChange: (open: boolean) => void } | null>(
  null,
);

export function Root({ children, handle, open, onOpenChange }: Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  useEffect(() => {
    if (handle) handle.setOpen = setOpen;
  }, [handle, setOpen]);

  return (
    <Context value={useMemo(() => ({ open: isOpen, onOpenChange: setOpen }), [isOpen, setOpen])}>
      <DrawerPrimitive isOpen={isOpen} onOpenChange={setOpen}>
        {children}
      </DrawerPrimitive>
    </Context>
  );
}
export namespace Root {
  export type Props = {
    children?: ReactNode;
    handle?: Handle;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    swipeDirection?: 'left' | 'right' | 'up' | 'down';
  };
}

export function Trigger({ handle, render, onClick, ...props }: Trigger.Props) {
  const ctx = use(Context);
  const state = { open: ctx?.open ?? false };

  return renderPrimitive(
    'button',
    {
      ...props,
      render,
      onClick(event: MouseEvent) {
        onClick?.(event);
        handle?.open();
        ctx?.onOpenChange(true);
      },
    },
    state,
  );
}
export namespace Trigger {
  export type Props = PrimitiveProps & {
    handle?: Handle;
    onClick?: (event: MouseEvent) => void;
  };
}

export function Portal({ children }: { children?: ReactNode; className?: string }) {
  return children;
}

export function Backdrop(props: Backdrop.Props) {
  return renderPrimitive('div', props, { open: true });
}
export namespace Backdrop {
  export type Props = PrimitiveProps;
}

export function Viewport(props: Viewport.Props) {
  return renderPrimitive('div', props);
}
export namespace Viewport {
  export type Props = PrimitiveProps;
}

export function Popup(props: Popup.Props) {
  return renderPrimitive('div', props, { open: true });
}
export namespace Popup {
  export type Props = PrimitiveProps;
}

export function Content(props: Content.Props) {
  return renderPrimitive('div', props);
}
export namespace Content {
  export type Props = PrimitiveProps;
}

export function Title(props: Title.Props) {
  return renderPrimitive('h2', props);
}
export namespace Title {
  export type Props = PrimitiveProps;
}

export function Close({ onClick, ...props }: Close.Props) {
  const ctx = use(Context);

  return renderPrimitive('button', {
    ...props,
    onClick(event: MouseEvent) {
      onClick?.(event);
      ctx?.onOpenChange(false);
    },
  });
}
export namespace Close {
  export type Props = PrimitiveProps & {
    onClick?: (event: MouseEvent) => void;
  };
}
