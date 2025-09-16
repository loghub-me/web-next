'use client';

import { SettingThemeForm } from '@/components/client/setting';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';

export default function ThemeSettingPage() {
  return (
    <Card className="mx-auto max-w-3xl w-full">
      <CardHeader className="space-y-1.5 pb-4 border-b">
        <CardTitle>테마 설정</CardTitle>
        <CardDescription>
          라이트 모드, 다크 모드 또는 시스템 설정에 따라 자동으로 변경되도록 설정할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SettingThemeForm />
      </CardContent>
    </Card>
  );
}
