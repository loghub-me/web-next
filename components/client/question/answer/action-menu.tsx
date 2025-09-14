'use client';

import { deleteQuestionAnswer } from '@/apis/client/question';
import { QuestionAnswerEditDialog, QuestionAnswerEditForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { Badge } from '@ui/badge';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { EllipsisIcon, TrashIcon, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface QuestionAnswerActionMenuProps {
  questionId: number;
  answer: QuestionAnswer;
}

export default function QuestionAnswerActionMenu({ questionId, answer }: Readonly<QuestionAnswerActionMenuProps>) {
  const { session } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);

  return (
    session?.id === answer.writer.id && (
      <>
        <Badge variant={'outline'} className="px-1">
          <UserRound /> 내 답변
        </Badge>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'} className="rounded-full">
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-1">
            <QuestionAnswerEditDialog open={openEdit} onOpenChange={setOpenEdit}>
              {openEdit && (
                <QuestionAnswerEditForm
                  questionId={questionId}
                  answer={answer}
                  closeDialog={() => setOpenEdit(false)}
                />
              )}
            </QuestionAnswerEditDialog>
            <QuestionDeleteButton questionId={questionId} answerId={answer.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  );
}

function QuestionDeleteButton({ questionId, answerId }: Readonly<{ questionId: number; answerId: number }>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteQuestionAnswer(questionId, answerId)
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
