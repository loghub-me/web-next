'use client';

import { checkGeneratingQuestionAnswer, requestGenerateQuestionAnswer } from '@/apis/client/question';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { GlowEffect } from '@ui/glow-effect';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Textarea } from '@ui/textarea';
import { BotIcon, ChevronDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface QuestionAnswerGenerateButtonProps {
  question: {
    id: number;
    writer: UserDetail;
  };
  align: 'start' | 'end';
}

export default function QuestionAnswerGenerateButton({ question, align }: Readonly<QuestionAnswerGenerateButtonProps>) {
  const router = useRouter();
  const { session } = useAuth();
  const isWriter = session?.id === question.writer.id;

  const instructionRef = useRef<HTMLTextAreaElement>(null);
  const prevAnswerGenerating = useRef<boolean>(null);
  const [open, setOpen] = useState(false);

  const { data: statusData, refetch } = useQuery({
    queryKey: ['checkGeneratingQuestionAnswer', question.id],
    queryFn: () => checkGeneratingQuestionAnswer(question.id),
    refetchInterval: (data) => (data.state.data?.data ? 3000 : false),
    enabled: isWriter,
  });
  const answerGenerating = statusData?.data || false;

  function onRequestButtonClick() {
    requestGenerateQuestionAnswer(question.id, instructionRef.current?.value)
      .then(({ message }) => {
        toast.success(message, { icon: <BotIcon className="size-4" /> });
        setOpen(false);
        refetch();
        if (instructionRef.current) {
          instructionRef.current.value = '';
        }
      })
      .catch(handleError);
  }

  useEffect(() => {
    if (!router) return;

    const prev = prevAnswerGenerating.current;
    if (prev === true && answerGenerating === false) {
      toast.success('답변 생성이 완료되었습니다!', { icon: <BotIcon className="size-4" /> });
      router.refresh();
    }
    prevAnswerGenerating.current = answerGenerating;
  }, [answerGenerating, router]);

  return (
    isWriter && (
      <ButtonGroup className="relative overflow-hidden rounded-full border-blue-400/40 dark:border-blue-400/40">
        <Button
          variant={'outline'}
          className="has-[>svg]:pr-2.5 rounded-full"
          onClick={onRequestButtonClick}
          disabled={answerGenerating}
        >
          <GlowEffect color={'bg-blue-400'} />
          <BotIcon className={cn('text-blue-400', answerGenerating && 'animate-swing repeat-infinite')} />
          <span className="hidden md:inline-block">답변 생성{answerGenerating && '중...'}</span>
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant={'outline'} className="has-[>svg]:pl-2.5 rounded-full" disabled={answerGenerating}>
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent align={align} className="px-0 py-4 flex flex-col gap-2">
            <CardHeader className="space-y-1.5">
              <CardTitle>AI 답변 생성 요청</CardTitle>
              <CardDescription>
                답변 생성은 <strong>10분에 한 번씩</strong> 요청 가능합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="instruction"
                ref={instructionRef}
                placeholder={'추가 요청사항을 입력해보세요.\n(예: 답변 스타일)'}
              />
            </CardContent>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    )
  );
}
