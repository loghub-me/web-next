import MemberGuard from '@/guard/member';

export default function ArticleEditLayout({ children }: Readonly<LayoutProps<'/[username]/articles/[slug]/edit'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
