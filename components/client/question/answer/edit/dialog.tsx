import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ui/dialog';
import { PencilIcon } from 'lucide-react';

interface QuestionAnswerEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function QuestionAnswerEditDialog({
  open,
  onOpenChange,
  children,
}: Readonly<QuestionAnswerEditDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <PencilIcon /> 수정하기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 block overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>답변 수정</DialogTitle>
          <DialogDescription>답변을 수정하면 다른 사용자들이 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
