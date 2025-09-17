'use client';

import { ButtonLink } from '@ui/button';
import { usePathname } from 'next/navigation';

interface SheetNavLinkProps {
  href: string;
  children?: React.ReactNode;
  closeSheet: () => void;
}

export default function SheetNavLink({ href, closeSheet, children }: Readonly<SheetNavLinkProps>) {
  const pathname = usePathname();

  return (
    <ButtonLink
      href={href}
      variant={pathname.startsWith(href) ? 'secondary' : 'ghost'}
      className={'justify-start'}
      onNavigate={closeSheet}
    >
      {children}
    </ButtonLink>
  );
}
