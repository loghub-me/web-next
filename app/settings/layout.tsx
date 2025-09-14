import { SettingNav } from '@/components/client/setting';
import MemberGuard from '@/guard/member';

export default function SettingLayout({ children }: LayoutProps<'/settings'>) {
  return (
    <MemberGuard>
      <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
        <SettingNav />
        {children}
      </main>
    </MemberGuard>
  );
}
