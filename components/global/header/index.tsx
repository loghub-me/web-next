import AuthMenu from '@/components/global/auth-menu';
import HeaderNavLink from '@/components/global/header/nav-link';
import GlobalSheet from '@/components/global/sheet';
import Symbol from '@/components/global/symbol';
import ThemeSwitch from '@/components/global/theme-switch';
import { HEADER_LINKS } from '@/constants/links';
import Link from 'next/link';

export default function GlobalHeader() {
  return (
    <header className="absolute top-0 left-0 w-full h-16 bg-background border-b">
      <div className="container mx-auto flex items-center gap-4 h-full px-4">
        <Link href={'/'} className="transition-opacity hover:opacity-70">
          <Symbol size={36} />
        </Link>
        <nav className="flex-1 flex items-center gap-1">
          {HEADER_LINKS.map(({ href, matchPaths, label }) => (
            <HeaderNavLink key={href} matchPaths={matchPaths} href={href}>
              {label}
            </HeaderNavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-1 ml-0 h-full">
          <ThemeSwitch />
          <AuthMenu type={'header'} />
        </div>
        <div className="flex md:hidden items-center gap-1 ml-0 h-full">
          <GlobalSheet />
        </div>
      </div>
    </header>
  );
}
