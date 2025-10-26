'use client';

import { Button } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <SunIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem onClick={() => setTheme('light')} asChild>
          <Button variant={'ghost'} size={'sm'} className="justify-start">
            <SunIcon /> 라이트
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} asChild>
          <Button variant={'ghost'} size={'sm'} className="justify-start">
            <MoonIcon /> 다크
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} asChild>
          <Button variant={'ghost'} size={'sm'} className="justify-start">
            <MonitorIcon /> 시스템
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
