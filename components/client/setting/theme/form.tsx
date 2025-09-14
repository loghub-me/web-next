'use client';

import { THEME_OPTIONS } from '@/constants/options';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SettingThemeForm() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex justify-between gap-2">
      {mounted &&
        theme &&
        Object.entries(THEME_OPTIONS).map(([key, { label, icon: Icon }]) => (
          <Button
            key={key}
            onClick={() => setTheme(key)}
            variant={theme === key ? 'secondary' : 'ghost'}
            className={cn('flex-1 flex-col gap-3 p-4 h-auto border', theme != key && 'text-muted-foreground')}
          >
            <Icon className="size-6" />
            <span className="font-semibold">{label}</span>
          </Button>
        ))}
    </div>
  );
}
