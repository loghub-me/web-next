'use client';

import { SETTING_LINKS } from '@/constants/links';
import { ButtonLink } from '@ui/button';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SettingNav() {
  return (
    <nav className="flex items-center justify-center gap-1 overflow-x-auto">
      {SETTING_LINKS.map((link) => (
        <SettingNavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}

interface SettingNavLinkProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

function SettingNavLink({ label, href, icon: Icon }: Readonly<SettingNavLinkProps>) {
  const pathname = usePathname();

  return (
    <ButtonLink href={href} variant={pathname === href ? 'secondary' : 'ghost'}>
      <Icon /> <span className="lg:block">{label}</span>
    </ButtonLink>
  );
}
