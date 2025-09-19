import { requestGenerateQuestionAnswer } from '@/apis/client/question';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
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
import { GlowEffect } from '@ui/glow-effect';
import { BotIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface QuestionAnswerGenerateButtonProps {
  question: {
    id: number;
    writer: UserDetail;
  };
}

export default function QuestionAnswerGenerateButton({ question }: Readonly<QuestionAnswerGenerateButtonProps>) {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);

  function onRequestButtonClick() {
    requestGenerateQuestionAnswer(question.id)
      .then(({ message }) => {
        toast.success(message, { icon: <BotIcon className="size-4" /> });
        setOpen(false);
      })
      .catch(handleError);
  }

  return (
    session?.id === question.writer.id && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={'outline'}
            className="relative overflow-hidden rounded-full border-blue-400/40 dark:border-blue-400/40"
          >
            <GlowEffect color={'bg-blue-400'} />
            <BotIcon className="text-blue-400" /> 답변 생성
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI 답변 생성 요청</DialogTitle>
            <DialogDescription>답변 생성은 10분에 한 번만 요청할 수 있습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogCloseButton>취소하기</DialogCloseButton>
            <Button type="submit" variant={'secondary'} className="border" onClick={onRequestButtonClick}>
              <BotIcon className="text-blue-400" /> 요청하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
