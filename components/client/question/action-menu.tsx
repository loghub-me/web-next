'use client';

import { closeQuestion, deleteQuestion } from '@/apis/client/question';
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
import { CircleXIcon, EllipsisIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface QuestionActionMenuProps {
  id: number;
  status: QuestionStatus;
  writer: User;
}

export default function QuestionActionMenu({ id, status, writer }: Readonly<QuestionActionMenuProps>) {
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
          <QuestionEditLink id={id} />
          <QuestionDeleteButton id={id} />
          {status === 'OPEN' && <QuestionCloseButton id={id} />}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

function QuestionEditLink({ id }: Readonly<Pick<QuestionActionMenuProps, 'id'>>) {
  return (
    <ButtonLink href={`/edit/questions/${id}`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function QuestionDeleteButton({ id }: Readonly<Pick<QuestionActionMenuProps, 'id'>>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteQuestion(id)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.replace('/search/questions');
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
          <DialogDescription>삭제된 질문은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
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

function QuestionCloseButton({ id }: Readonly<Pick<QuestionActionMenuProps, 'id'>>) {
  const router = useRouter();

  function onCloseButtonClick() {
    closeQuestion(id)
      .then(({ message }) => {
        toast.success(message, { icon: <CircleXIcon className="size-4" /> });
        router.refresh();
      })
      .catch(handleError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'} className="justify-start">
          <CircleXIcon className="mr-0.5" /> 닫기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 질문을 닫겠습니까?</DialogTitle>
          <DialogDescription>닫은 질문은 복구할 수 없습니다. 정말로 닫겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={onCloseButtonClick}>
            <CircleXIcon /> 닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
