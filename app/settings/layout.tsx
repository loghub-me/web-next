import { SettingNav } from '@/components/client/setting';
import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '설정',
  description: '계정 및 서비스 환경 설정',
};

export default function SettingLayout({ children }: LayoutProps<'/settings'>) {
  return (
    <MemberGuard>
      <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
        <SettingNav />
        {children}
      </main>
    </MemberGuard>
  );
}
