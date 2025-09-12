import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ui/dialog';
import { UploadIcon } from 'lucide-react';

interface QuestionPostDialogProps {
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function QuestionPostDialog({ onOpenChange, children }: Readonly<QuestionPostDialogProps>) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'default'}>
          <UploadIcon /> 게시하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>질문 게시</DialogTitle>
          <DialogDescription>질문을 게시하면 다른 사용자들이 아티클을 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
