import { Button } from '@ui/button';
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
import { PencilIcon } from 'lucide-react';

export default function SettingPasswordDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            이 사이트는 <strong>비밀번호</strong>를 지원하지 않습니다.
          </DialogTitle>
          <DialogDescription>OTP(One-Time Password) 또는 소셜 로그인을 사용하여 로그인해 주세요.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>닫기</DialogCloseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
