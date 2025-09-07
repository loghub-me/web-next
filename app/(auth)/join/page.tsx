import { JoinRequestForm, LoginSocialLinks } from '@/components/client/auth';
import Symbol from '@/components/global/symbol';
import Link from 'next/link';

export default async function JoinRequestPage() {
  return (
    <section className="flex-1 p-4 pb-8 flex items-center justify-center">
      <div className="max-w-70 w-full space-y-4">
        <Symbol size={36} className="mx-auto" />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">회원가입</h2>
          <p className="text-sm text-muted-foreground">회원가입을 위해 폼을 입력해주세요.</p>
        </div>
        <JoinRequestForm />
        <LoginSocialLinks />
        <p className="text-sm text-muted-foreground text-center">
          이미 계정이 있으신가요?{' '}
          <Link href={'/login'} className="text-foreground hover:text-foreground/80 underline">
            로그인으로
          </Link>
        </p>
      </div>
    </section>
  );
}
