'use client';

import { SettingAccountForm, SettingWithdrawDialog } from '@/components/client/setting';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/card';

export default function AccountSettingPage() {
  const { status: authStatus, session } = useAuth();

  return (
    authStatus === 'authenticated' && (
      <Card className="mx-auto max-w-3xl w-full">
        <CardHeader className="space-y-1.5 pb-4 border-b">
          <CardTitle>계정 설정</CardTitle>
          <CardDescription>로그인에 사용되는 이메일 주소와 비밀번호를 변경할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4 border-b">
          <SettingAccountForm session={session} />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <SettingWithdrawDialog />
        </CardFooter>
      </Card>
    )
  );
}
