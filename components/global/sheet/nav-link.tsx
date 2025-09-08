'use client';

import { ButtonLink } from '@ui/button';
import { usePathname } from 'next/navigation';

interface SheetNavLinkProps {
  href: string;
  children?: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SheetNavLink({ href, children, setOpen }: Readonly<SheetNavLinkProps>) {
  const pathname = usePathname();

  return (
    <ButtonLink
      href={href}
      variant={pathname.startsWith(href) ? 'secondary' : 'ghost'}
      className={'justify-start'}
      onNavigate={() => setOpen(false)}
    >
      {children}
    </ButtonLink>
  );
}
