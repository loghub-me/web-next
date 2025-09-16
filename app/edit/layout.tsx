import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '수정',
  description: '내용을 수정합니다.',
};

export default function EditLayout({ children }: Readonly<LayoutProps<'/edit'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
