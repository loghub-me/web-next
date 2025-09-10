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
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setScaleX(progress > 1 ? 1 : progress);
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
