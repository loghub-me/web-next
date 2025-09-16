import MemberGuard from '@/guard/member';

export default function QuestionPostLayout({ children }: Readonly<LayoutProps<'/post/questions'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
