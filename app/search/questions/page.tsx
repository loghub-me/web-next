import { getQuestions } from '@/apis/server/question';
import { PageNav, PageSkeleton } from '@/components/client/page';
import { QuestionSearchForm } from '@/components/client/question';
import { QuestionList, QuestionListItem, QuestionListSkeleton } from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { questionSearchSchema } from '@/schemas/question';
import { Suspense } from 'react';

export default async function QuestionSearchPage({ searchParams }: PageProps<'/search/questions'>) {
  const parsedSearchParams = parseObject(await searchParams, questionSearchSchema);
  const questions = getQuestions(parsedSearchParams);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <QuestionSearchForm defaultValues={parsedSearchParams} />
      <QuestionList>
        <Suspense fallback={<QuestionListSkeleton />}>
          <QuestionListContent questions={questions} />
        </Suspense>
      </QuestionList>
      <Suspense fallback={<PageSkeleton />}>
        <QuestionPageNav currentPage={parsedSearchParams.page} questions={questions} />
      </Suspense>
    </main>
  );
}

interface QuestionListContentProps {
  questions: Promise<Page<Question>>;
}

async function QuestionListContent({ questions }: Readonly<QuestionListContentProps>) {
  const resolvedQuestions = await questions;
  return resolvedQuestions.content.map((question) => <QuestionListItem key={question.id} question={question} />);
}

interface QuestionPageNavProps extends QuestionListContentProps {
  currentPage: number;
}

async function QuestionPageNav({ currentPage, questions }: Readonly<QuestionPageNavProps>) {
  const resolvedQuestions = await questions;
  return <PageNav currentPage={currentPage} totalPages={resolvedQuestions.page.totalPages} />;
}
