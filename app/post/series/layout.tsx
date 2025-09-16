import MemberGuard from '@/guard/member';

export default function SeriesPostLayout({ children }: Readonly<LayoutProps<'/post/series'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
