import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시리즈 작성',
  description: '글을 묶어서 시리즈로 작성해보세요.',
};

export default function SeriesPostLayout({ children }: Readonly<LayoutProps<'/post/series'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
