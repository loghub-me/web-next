import { TopicIcon } from '@/components/client/topic';
import { buildAPIUrl } from '@/lib/utils';
import { Button, ButtonLink } from '@ui/button';
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';

export default function SocialLoginLinks() {
  return (
    <>
      <div className="flex items-center gap-2">
        <hr className="flex-grow" />
        <p className="text-xs text-muted-foreground whitespace-nowrap">또는 소셜 계정으로</p>
        <hr className="flex-grow" />
      </div>
      <div className="space-y-2">
        <SocialLoginLink href={buildAPIUrl('oauth2/authorize/google')}>
          <TopicIcon slug="google" name="Google" />
          구글로 로그인
        </SocialLoginLink>
        <SocialLoginLink href={buildAPIUrl('oauth2/authorize/github')}>
          <TopicIcon slug="github" name="GitHub" />
          깃허브로 로그인
        </SocialLoginLink>
      </div>
    </>
  );
}

interface SocialLoginLinkProps {
  href: string;
  children: React.ReactNode;
}

function SocialLoginLink({ href, children }: Readonly<SocialLoginLinkProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="w-full">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{children}</DialogTitle>
          <DialogDescription>
            로그인 진행 시, 자동으로 회원가입되며 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>취소하기</DialogCloseButton>
          <ButtonLink variant={'outline'} href={href} className="px-2">
            {children}
          </ButtonLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
