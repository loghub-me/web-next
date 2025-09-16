import { LoginRequestForm, LoginSocialLinks } from '@/components/client/auth';
import Symbol from '@/components/global/symbol';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인을 위해 이메일을 입력해주세요.',
};

export default async function LoginRequestPage() {
  return (
    <section className="flex-1 p-4 pb-8 flex items-center justify-center">
      <div className="max-w-70 w-full space-y-4">
        <Symbol size={36} className="mx-auto" />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">로그인</h2>
          <p className="text-sm text-muted-foreground">로그인을 위해 이메일을 입력해주세요.</p>
        </div>
        <LoginRequestForm />
        <LoginSocialLinks />
        <p className="text-sm text-muted-foreground text-center">
          계정이 없으신가요?{' '}
          <Link href={'/join'} className="text-foreground hover:text-foreground/80 underline">
            회원가입으로
          </Link>
        </p>
      </div>
    </section>
  );
}
