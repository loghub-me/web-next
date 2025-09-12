import { getQuestionAnswers, getQuestionDetail } from '@/apis/server/question';
import { QuestionAnswerTOCCard, QuestionAnswerTOCSkeleton } from '@/components/client/question';
import {
  QuestionAnswerList,
  QuestionAnswerListItem,
  QuestionAnswerListSkeleton,
  QuestionDetailAside,
  QuestionDetailContent,
  QuestionDetailHeader,
  QuestionDetailHero,
  QuestionStatusCard,
} from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';
import { Card } from '@ui/card';
import { Suspense } from 'react';

export default async function QuestionDetailPage({ params }: PageProps<'/[username]/questions/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const question = await getQuestionDetail(username, slug);
  const answers = getQuestionAnswers(question.id);

  return (
    <main className="container mx-auto pt-20 pb-4 min-h-screen space-y-4">
      <QuestionDetailHero {...question} />
      <div className="flex gap-4">
        <div className="w-full min-w-0 space-y-4">
          <Card id="question" className="pt-0">
            <QuestionDetailHeader {...question} />
            <QuestionDetailContent {...question} />
          </Card>
          <QuestionAnswerList>
            <Suspense fallback={<QuestionAnswerListSkeleton />}>
              <QuestionAnswerListContent answers={answers} questionId={question.id} />
            </Suspense>
          </QuestionAnswerList>
        </div>
        <QuestionDetailAside>
          <QuestionStatusCard {...question} />
          <Suspense fallback={<QuestionAnswerTOCSkeleton />}>
            <QuestionAnswerTOCContent answers={answers} />
          </Suspense>
        </QuestionDetailAside>
      </div>
    </main>
  );
}

interface QuestionAnswerListContentProps {
  answers: Promise<QuestionAnswer[]>;
  questionId: number;
}

async function QuestionAnswerListContent({ answers, questionId }: Readonly<QuestionAnswerListContentProps>) {
  const resolvedAnswers = await answers;
  return resolvedAnswers.map((answer) => (
    <QuestionAnswerListItem key={answer.id} answer={answer} questionId={questionId} />
  ));
}

async function QuestionAnswerTOCContent({ answers }: Readonly<Pick<QuestionAnswerListContentProps, 'answers'>>) {
  const resolvedAnswers = await answers;
  return <QuestionAnswerTOCCard answers={resolvedAnswers} />;
}
