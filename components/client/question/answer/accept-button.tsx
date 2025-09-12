'use client';

import { acceptQuestionAnswer } from '@/apis/client/question';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
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
  questionId: number;
  questionWriter: User;
  id: number;
}

export default function QuestionAnswerAcceptButton({
  questionId,
  questionWriter,
  id,
}: Readonly<QuestionAnswerAcceptButtonProps>) {
  const { session } = useAuth();
  const router = useRouter();

  function onAcceptButtonClick() {
    acceptQuestionAnswer(questionId, id)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.refresh();
      })
      .catch(handleError);
  }

  return (
    session?.id === questionWriter.id && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} size={'sm'}>
            <CheckCircleIcon className="mr-0.5" /> 채택하기
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
