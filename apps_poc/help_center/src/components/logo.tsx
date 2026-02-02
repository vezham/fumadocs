'use client';
import { useId } from 'react';
import { AvatarIcon } from '@vezham/react/v2';

export const Logo = () => {
  const id = useId();

  return (
    <>
      <AvatarIcon />
      Vezham
    </>
  );
};
