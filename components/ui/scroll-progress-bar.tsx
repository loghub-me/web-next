'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ScrollProgressBarProps {
  className?: string;
}

export default function ScrollProgressBar({ className }: Readonly<ScrollProgressBarProps>) {
  const [scaleX, setScaleX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const rawProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const progress = Math.min(1, Math.max(0, rawProgress));
      setScaleX(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <hr
      className={cn('sticky top-16 z-10 border-2 border-primary origin-left', className)}
      style={{ transform: `scaleX(${scaleX})` }}
    />
  );
}
