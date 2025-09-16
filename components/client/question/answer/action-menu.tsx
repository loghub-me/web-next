'use client';

import { deleteQuestionAnswer } from '@/apis/client/question';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface QuestionAnswerActionMenuProps {
  questionId: number;
  answer: {
    id: number;
    writer: UserDetail;
  };
}

export default function QuestionAnswerActionMenu({ questionId, answer }: Readonly<QuestionAnswerActionMenuProps>) {
  const { session } = useAuth();

  return (
    session?.id === answer.writer.id && (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'} className="rounded-full">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          <QuestionEditLink questionId={questionId} answer={answer} />
          <QuestionDeleteButton questionId={questionId} answer={answer} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

function QuestionEditLink({
  questionId,
  answer,
}: Readonly<Pick<QuestionAnswerActionMenuProps, 'questionId' | 'answer'>>) {
  return (
    <ButtonLink href={`/edit/questions/${questionId}/answers/${answer.id}`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function QuestionDeleteButton({
  questionId,
  answer,
}: Readonly<Pick<QuestionAnswerActionMenuProps, 'questionId' | 'answer'>>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteQuestionAnswer(questionId, answer.id)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.refresh();
      })
      .catch(handleError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <TrashIcon className="mr-0.5" /> 삭제하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>삭제된 답변은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>취소하기</DialogCloseButton>
          <Button type="submit" variant="destructive" onClick={onDeleteButtonClick}>
            <TrashIcon /> 삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
