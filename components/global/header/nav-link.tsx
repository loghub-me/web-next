'use client';

import { cn } from '@/lib/utils';
import { ButtonLink } from '@ui/button';
import { usePathname } from 'next/navigation';

interface HeaderNavLinkProps {
  href: string;
  matchPaths?: string[];
  children?: React.ReactNode;
}

export default function HeaderNavLink({ href, matchPaths, children }: Readonly<HeaderNavLinkProps>) {
  const pathname = usePathname();
  const active = pathname.startsWith(href) || matchPaths?.some((path) => pathname.startsWith(path));

  return (
    <ButtonLink
      href={href}
      variant={'ghost'}
      className={cn('hidden md:flex', active ? 'font-semibold' : 'font-medium text-muted-foreground')}
      size={'sm'}
    >
      {children}
    </ButtonLink>
  );
}
