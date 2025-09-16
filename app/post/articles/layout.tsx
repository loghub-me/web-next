import MemberGuard from '@/guard/member';

export default function ArticlePostLayout({ children }: Readonly<LayoutProps<'/post/articles'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
