'use client';

import { THEME_OPTIONS } from '@/constants/options';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  function onClickButton() {
    const themes = Object.keys(THEME_OPTIONS);
    const currentIndex = themes.indexOf(theme || '');
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button variant={'ghost'} size={'icon'} onClick={onClickButton} className="rounded-full">
      {mounted &&
        theme &&
        Object.entries(THEME_OPTIONS).map(([key, { icon: Icon }]) => (
          <Icon key={key} className={cn(theme === key ? 'block' : 'hidden')} />
        ))}
    </Button>
  );
}
