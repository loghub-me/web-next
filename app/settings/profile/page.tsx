'use client';

import { getSelfProfile } from '@/apis/client/user';
import { SettingAvatarForm, SettingProfileForm } from '@/components/client/setting';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';

export default function ProfileSettingPage() {
  const { status: authStatus, session } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ['getSelfProfile'],
    queryFn: getSelfProfile,
    enabled: authStatus === 'authenticated',
  });

  return (
    authStatus === 'authenticated' &&
    profile && (
      <Card className="mx-auto max-w-3xl w-full">
        <CardHeader className="space-y-1.5 pb-4 border-b">
          <CardTitle>프로필 설정</CardTitle>
          <CardDescription>프로필 설정을 변경하려면 아래 폼을 작성해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <SettingAvatarForm session={session} />
          <SettingProfileForm profile={profile} />
        </CardContent>
      </Card>
    )
  );
}
