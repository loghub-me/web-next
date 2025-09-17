import { TopicIcon } from '@/components/client/topic';
import { buildAPIUrl } from '@/lib/utils';
import { ButtonLink } from '@ui/button';

export default function LoginSocialLinks() {
  return (
    <>
      <div className="flex items-center gap-2">
        <hr className="flex-grow" />
        <p className="text-xs text-muted-foreground whitespace-nowrap">또는 소셜 계정으로</p>
        <hr className="flex-grow" />
      </div>
      <ButtonLink variant={'outline'} href={buildAPIUrl('oauth2/authorize/google')} className="w-full">
        <TopicIcon slug="google" name="Google" />
        구글로 로그인
      </ButtonLink>
      <ButtonLink variant={'outline'} href={buildAPIUrl('oauth2/authorize/github')} className="w-full">
        <TopicIcon slug="github" name="GitHub" />
        깃허브로 로그인
      </ButtonLink>
    </>
  );
}
