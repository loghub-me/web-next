'use client';

import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function LabelRequired({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="label-required" className={cn('text-destructive', className)} aria-hidden="true" {...props}>
      *
    </span>
  );
}

function LabelOptional({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="label-optional"
      className={cn('text-muted-foreground font-normal', className)}
      aria-hidden="true"
      {...props}
    >
      (선택)
    </span>
  );
}

export { Label, LabelRequired, LabelOptional };
