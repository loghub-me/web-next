'use client';

import { Skeleton } from '@ui/skeleton';
import { useTheme } from 'next-themes';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

export default function ThemedImage(
  props: Readonly<
    Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
      src: {
        light: string;
        dark: string;
      };
    }
  >
) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { src, alt, ...rest } = props;

  let resolvedSrc;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Skeleton
        data-slot="themed-image-skeleton"
        aria-hidden="true"
        aria-label={props.alt || `Loading ${props.alt}`}
        style={{ width: props.width, height: props.height }}
      />
    );
  }

  switch (resolvedTheme) {
    case 'light':
      resolvedSrc = src.light;
      break;
    case 'dark':
      resolvedSrc = src.dark;
      break;
    default:
      resolvedSrc = src.light;
      break;
  }

  return <Image src={resolvedSrc} alt={alt || 'themed image'} loading={'lazy'} {...rest} />;
}
