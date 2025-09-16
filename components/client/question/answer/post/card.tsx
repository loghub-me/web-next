'use client';

import { QuestionAnswerPostForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { ButtonLink } from '@ui/button';
import { Card } from '@ui/card';
import { LogInIcon } from 'lucide-react';

interface QuestionAnswerPostCardProps {
  question: {
    id: number;
    writer: User;
  };
}

export default function QuestionAnswerPostCard({ question }: Readonly<QuestionAnswerPostCardProps>) {
  const { status: authStatus, session } = useAuth();

  switch (authStatus) {
    case 'loading':
    case 'unauthenticated':
      return (
        <Card className="p-4 flex-row items-center bg-primary/10 gap-3">
          <ButtonLink variant={'default'} href={'/login'}>
            <LogInIcon /> 로그인
          </ButtonLink>
          <p className="text-sm text-accent-foreground">하고 답변을 작성해 보세요!</p>
        </Card>
      );
    case 'authenticated':
      return (
        session?.id != question.writer.id && (
          <Card className="p-0 overflow-hidden">
            <QuestionAnswerPostForm questionId={question.id} />
          </Card>
        )
      );
  }
}
