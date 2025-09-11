import MemberGuard from '@/guard/member';

export default function EditLayout({ children }: Readonly<LayoutProps<'/edit'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
