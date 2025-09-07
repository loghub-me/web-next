import { JoinConfirmForm } from '@/components/client/auth';
import Symbol from '@/components/global/symbol';
import { parseObject } from '@/lib/parse';
import { joinConfirmSearchParamsSchema } from '@/schemas/auth';

interface LoginConfirmPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function JoinConfirmPage({ searchParams }: Readonly<LoginConfirmPageProps>) {
  const parsedSearchParams = parseObject(await searchParams, joinConfirmSearchParamsSchema);

  return (
    <section className="flex-1 p-4 pb-8 flex items-center justify-center">
      <div className="max-w-70 w-full space-y-4">
        <Symbol size={36} className="mx-auto" />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">회원가입 확인</h2>
          <p className="text-sm text-muted-foreground">회원가입 확인을 위해 인증번호를 입력해주세요.</p>
        </div>
        <JoinConfirmForm defaultValues={parsedSearchParams} />
      </div>
    </section>
  );
}
