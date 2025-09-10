import MemberGuard from '@/guard/member';

export default function PostLayout({ children }: Readonly<LayoutProps<'/post'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
