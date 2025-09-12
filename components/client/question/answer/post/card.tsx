'use client';

import { QuestionAnswerPostForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { LogInIcon } from 'lucide-react';

interface QuestionAnswerPostCardProps {
  questionId: number;
  questionWriter: User;
}

export default function QuestionAnswerPostCard({ questionId, questionWriter }: Readonly<QuestionAnswerPostCardProps>) {
  const { status: authStatus, session } = useAuth();

  switch (authStatus) {
    case 'loading':
    case 'unauthenticated':
      return (
        <Card className="p-4 flex-row items-center bg-primary/10 gap-3">
          <Button>
            <LogInIcon /> 로그인
          </Button>
          <p className="text-sm text-accent-foreground">하고 답변을 작성해 보세요!</p>
        </Card>
      );
    case 'authenticated':
      return (
        session?.id != questionWriter.id && (
          <Card className="p-0 overflow-hidden">
            <QuestionAnswerPostForm questionId={questionId} />
          </Card>
        )
      );
  }
}
