'use client';

import { deleteQuestionAnswer } from '@/apis/client/question';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { Button, ButtonLink } from '@ui/button';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { EllipsisIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface QuestionAnswerActionMenuProps {
  questionId: number;
  id: number;
  writer: User;
}

export default function QuestionAnswerActionMenu({ questionId, id, writer }: Readonly<QuestionAnswerActionMenuProps>) {
  const { session } = useAuth();

  return (
    session?.username === writer.username && (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'} className="rounded-full">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          <QuestionEditLink questionId={questionId} id={id} />
          <QuestionDeleteButton questionId={questionId} id={id} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

function QuestionEditLink({ questionId, id }: Readonly<Pick<QuestionAnswerActionMenuProps, 'questionId' | 'id'>>) {
  return (
    <ButtonLink href={`/edit/questions/${questionId}/${id}`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function QuestionDeleteButton({ questionId, id }: Readonly<Pick<QuestionAnswerActionMenuProps, 'questionId' | 'id'>>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteQuestionAnswer(questionId, id)
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
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={onDeleteButtonClick}>
            <TrashIcon /> 삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
