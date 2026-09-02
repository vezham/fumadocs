'use client';
import type { ComponentProps } from 'react';
import { Heading as BaseHeading } from '@vx-oss/docs-react/components/heading';
import { useRenderContext } from '../contexts/api';
import { useAnchorId } from '@vx-oss/docs-api/auto-anchor/client';

export function Heading({
  id: _id,
  depth,
  ...props
}: ComponentProps<'h1'> & { id: string; depth: number }) {
  const id = useAnchorId([_id]);
  const Component = useRenderContext().components?.Heading;
  if (Component) return <Component id={id} depth={depth} {...props} />;

  return <BaseHeading id={id} as={`h${depth}` as `h1`} {...props} />;
}
