'use client';

import { getSelfPrivacy } from '@/apis/client/user';
import { SettingPrivacyForm } from '@/components/client/setting';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';

export default function PrivacySettingPage() {
  const { status: authStatus } = useAuth();
  const { data: privacy } = useQuery({
    queryKey: ['getSelfPrivacy'],
    queryFn: getSelfPrivacy,
    enabled: authStatus === 'authenticated',
  });

  return (
    authStatus === 'authenticated' &&
    privacy && (
      <Card className="mx-auto max-w-3xl w-full">
        <CardHeader className="space-y-1.5 pb-4 border-b">
          <CardTitle>개인정보 설정</CardTitle>
          <CardDescription>다른 사용자에게 표시되는 정보를 관리할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingPrivacyForm privacy={privacy} />
        </CardContent>
      </Card>
    )
  );
}
