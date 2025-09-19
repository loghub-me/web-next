import { cn } from '@/lib/utils';
import React from 'react';

interface GlowEffectProps {
  color: string;
}

function GlowEffect({ color }: Readonly<GlowEffectProps>) {
  return (
    <>
      <div className={cn('absolute -top-4 z-1', 'size-4 rounded-full blur', 'animate-slide-ltr', color)} />
      <div className={cn('absolute -bottom-4 z-1', 'size-4 rounded-full blur', 'animate-slide-rtl', color)} />
    </>
  );
}

export { GlowEffect };
