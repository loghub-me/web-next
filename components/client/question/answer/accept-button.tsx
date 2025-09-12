'use client';

import { acceptQuestionAnswer } from '@/apis/client/question';
import { QUESTION_STATUS_OPTIONS } from '@/constants/options';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { CheckCircleIcon, TrashIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface QuestionAnswerAcceptButtonProps {
  question: {
    id: number;
    writer: User;
  };
  id: number;
}

export default function QuestionAnswerAcceptButton({ question, id }: Readonly<QuestionAnswerAcceptButtonProps>) {
  const { session } = useAuth();
  const router = useRouter();

  function onAcceptButtonClick() {
    acceptQuestionAnswer(question.id, id)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.refresh();
      })
      .catch(handleError);
  }

  return (
    session?.id === question.writer.id && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} size={'sm'}>
            <CheckCircleIcon className={cn('mr-0.5', QUESTION_STATUS_OPTIONS['SOLVED'].color)} /> 채택하기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말로 채택하시겠습니까?</DialogTitle>
            <DialogDescription>채택된 답변은 취소할 수 없습니다. 정말로 채택하시겠습니까?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                <XIcon /> 취소하기
              </Button>
            </DialogClose>
            <Button type="submit" onClick={onAcceptButtonClick}>
              <CheckCircleIcon /> 채택하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
