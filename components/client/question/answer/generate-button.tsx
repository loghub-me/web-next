'use client';

import { getQuestionAnswerGenerating, requestGenerateQuestionAnswer } from '@/apis/client/question';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface QuestionAnswerGenerateButtonProps {
  question: {
    id: number;
    writer: UserDetail;
    answerGenerating: boolean;
  };
}

export default function QuestionAnswerGenerateButton({ question }: Readonly<QuestionAnswerGenerateButtonProps>) {
  const router = useRouter();
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [polling, setPolling] = useState(false);
  const { data: pollingData } = useQuery({
    queryKey: ['getQuestionAnswerGenerating', question.id],
    queryFn: () => getQuestionAnswerGenerating(question.id),
    refetchInterval: 5000,
    enabled: polling,
  });
  const answerGenerating = pollingData?.data || question.answerGenerating;

  function onRequestButtonClick() {
    requestGenerateQuestionAnswer(question.id)
      .then(({ message }) => {
        toast.success(message, { icon: <BotIcon className="size-4" /> });
        setOpen(false);
        setPolling(true);
      })
      .catch(handleError);
  }

  useEffect(() => {
    if (polling && pollingData?.data === false) {
      setPolling(false);
      toast.success('답변 생성이 완료되었습니다!', { icon: <BotIcon className="size-4" /> });
      router.refresh();
    }
  }, [router, polling, pollingData]);

  return (
    session?.id === question.writer.id && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={'outline'}
            className="relative overflow-hidden rounded-full border-blue-400/40 dark:border-blue-400/40"
            disabled={answerGenerating}
          >
            <GlowEffect color={'bg-blue-400'} />
            <BotIcon className={cn('text-blue-400', answerGenerating && 'animate-swing repeat-infinite')} /> 답변 생성
            {answerGenerating && '중...'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI 답변 생성 요청</DialogTitle>
            <DialogDescription>
              답변 생성은 <strong>10분에 한 번씩</strong> 요청할 수 있습니다.
            </DialogDescription>
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
