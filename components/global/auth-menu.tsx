'use client';

import { logout } from '@/apis/client/auth';
import { UserAvatar } from '@/components/client/user';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { Button, ButtonLink } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Skeleton } from '@ui/skeleton';
import {
  ChevronUpIcon,
  LogInIcon,
  LogOutIcon,
  NotepadTextIcon,
  PencilIcon,
  SettingsIcon,
  UserCircleIcon,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

interface AuthMenuProps {
  type: 'header' | 'sheet';
  onNavigate?: () => void;
}

export default function AuthMenu({ type, onNavigate }: Readonly<AuthMenuProps>) {
  const { status, session } = useAuth();

  switch (status) {
    case 'loading':
      return <Skeleton className={cn('h-9', type === 'header' ? 'w-24' : 'flex-1')} />;
    case 'unauthenticated':
      return <GuestMenu type={type} onNavigate={onNavigate} />;
    case 'authenticated':
      return <MemberMenu type={type} session={session} />;
  }
}

function GuestMenu({ type, onNavigate }: Readonly<AuthMenuProps>) {
  return (
    <ButtonLink
      href={'/login'}
      variant={'default'}
      className={cn(type === 'sheet' && 'flex-1')}
      onNavigate={onNavigate}
    >
      <LogInIcon /> 로그인
    </ButtonLink>
  );
}

function MemberMenu({ type, session }: Readonly<AuthMenuProps & { session: Session }>) {
  const [open, setOpen] = useState(false);
  const { unregisterSession } = useAuth();

  const navLinks = [
    [{ href: `/${session?.username}`, label: '프로필', icon: UserCircleIcon }],
    [
      { href: '/post', label: '포스트', icon: PencilIcon },
      { href: '/manual', label: '메뉴얼', icon: NotepadTextIcon },
      { href: '/settings', label: '설정', icon: SettingsIcon },
    ],
  ];

  function onClickLogout() {
    logout()
      .then(({ message }) => toast.info(message))
      .catch(handleError)
      .finally(unregisterSession);
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={open ? 'secondary' : 'outline'}
          className={cn('has-[>svg]:px-1.5 border', type === 'sheet' && 'flex-1')}
        >
          <UserAvatar {...session} /> {session.username}
          <ChevronUpIcon
            className={cn(
              'ml-auto transition-transform',
              type === 'header' ? open && '-rotate-180' : !open && 'rotate-180'
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('flex flex-col gap-1', type === 'sheet' && 'w-52')}>
        {navLinks.map((group, index) => (
          <Fragment key={index}>
            {group.map(({ href, label, icon: Icon }) => (
              <DropdownMenuItem key={href} asChild>
                <ButtonLink href={href} className="justify-start" size={'sm'}>
                  <Icon /> {label}
                </ButtonLink>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </Fragment>
        ))}
        <DropdownMenuItem asChild>
          <Button variant={'ghost'} className="justify-start" size={'sm'} onClick={onClickLogout}>
            <LogOutIcon /> 로그아웃
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
