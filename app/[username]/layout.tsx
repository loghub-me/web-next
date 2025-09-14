import { getUserDetail } from '@/apis/server/user';
import { UserAvatar, UserDetailNav } from '@/components/client/user';
import { UserDetailAside, UserDetailAsideSkeleton } from '@/components/server/user';
import { parseObject } from '@/lib/parse';
import { userDetailSchema } from '@/schemas/user';
import { MailIcon } from 'lucide-react';
import { Suspense } from 'react';

export default async function UserDetailLayout({ params, children }: LayoutProps<'/[username]'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const user = getUserDetail(parsedParam.username);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <UserDetailAside>
          <Suspense fallback={<UserDetailAsideSkeleton />}>
            <UserDetailAsideContent user={user} />
          </Suspense>
        </UserDetailAside>
        <div className="flex-1 min-w-0 space-y-4">
          <UserDetailNav {...parsedParam} />
          {children}
        </div>
      </div>
    </main>
  );
}

interface UserDetailAsideContentProps {
  user: Promise<UserDetail>;
}

async function UserDetailAsideContent({ user }: Readonly<UserDetailAsideContentProps>) {
  const resolvedUser = await user;
  const { username, nickname, email } = resolvedUser;

  return (
    <>
      <UserAvatar size={'xl'} {...resolvedUser} className="shadow-xs" />
      <div className="w-full space-y-1.5">
        <h3 className="text-lg font-semibold">@{username}</h3>
        <p className="text-sm text-muted-foreground">{nickname}</p>
      </div>
      <div className="space-y-1.5 w-full">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MailIcon className="size-4" /> {email || '비공개'}
        </p>
      </div>
    </>
  );
}
