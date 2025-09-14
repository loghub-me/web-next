import { getUserProfile } from '@/apis/server/user';
import UserActivities from '@/components/client/user/activity';
import { parseObject } from '@/lib/parse';
import { cn } from '@/lib/utils';
import { userActivitySearchSchema, userDetailSchema } from '@/schemas/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';

export default async function UserProfilePage({ params, searchParams }: PageProps<'/[username]'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParam = parseObject(await searchParams, userActivitySearchSchema);
  const profile = await getUserProfile(parsedParam.username);
  const hasREADME = profile.readme.length > 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className={cn('space-y-1.5', hasREADME && 'pb-4 border-b')}>
          <CardTitle>README</CardTitle>
          {!hasREADME && <CardDescription>아직 README가 작성되지 않았습니다.</CardDescription>}
        </CardHeader>
        {hasREADME && <CardContent>{profile.readme}</CardContent>}
      </Card>
      <UserActivities userId={profile.id} {...parsedParam} {...parsedSearchParam} />
    </div>
  );
}
