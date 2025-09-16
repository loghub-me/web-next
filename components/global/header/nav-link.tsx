'use client';

import { ButtonLink } from '@ui/button';
import { usePathname } from 'next/navigation';

interface HeaderNavLinkProps {
  href: string;
  children?: React.ReactNode;
}

export default function HeaderNavLink({ href, children }: Readonly<HeaderNavLinkProps>) {
  const pathname = usePathname();

  return (
    <ButtonLink
      href={href}
      variant={pathname.startsWith(href) ? 'secondary' : 'ghost'}
      size={'sm'}
      className="hidden md:flex"
    >
      {children}
    </ButtonLink>
  );
}
