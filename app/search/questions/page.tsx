import { getQuestions } from '@/apis/server/question';
import { PageNav, PageSkeleton } from '@/components/client/page';
import { QuestionSearchForm } from '@/components/client/question';
import { QuestionList, QuestionListItem, QuestionListSkeleton } from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { questionSearchSchema } from '@/schemas/question';
import ListEmpty from '@ui/list-empty';
import { Suspense } from 'react';

export default async function QuestionSearchPage({ searchParams }: PageProps<'/search/questions'>) {
  const parsedSearchParams = parseObject(await searchParams, questionSearchSchema);
  const questions = getQuestions(parsedSearchParams);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <QuestionSearchForm defaultValues={parsedSearchParams} />
      <QuestionList>
        <Suspense fallback={<QuestionListSkeleton />}>
          <QuestionListItems questions={questions} />
        </Suspense>
      </QuestionList>
      <Suspense fallback={<PageSkeleton />}>
        <QuestionPageNav currentPage={parsedSearchParams.page} questions={questions} />
      </Suspense>
    </main>
  );
}

interface QuestionListItemsProps {
  questions: Promise<Page<Question>>;
}

export async function QuestionListItems({ questions }: Readonly<QuestionListItemsProps>) {
  const resolvedQuestions = await questions;

  if (resolvedQuestions.content.length === 0) {
    return <ListEmpty message={'검색된 질문이 없습니다.'} className="py-4" />;
  }

  return resolvedQuestions.content.map((question) => <QuestionListItem key={question.id} question={question} />);
}

interface QuestionPageNavProps extends QuestionListItemsProps {
  currentPage: number;
}

export async function QuestionPageNav({ currentPage, questions }: Readonly<QuestionPageNavProps>) {
  const resolvedQuestions = await questions;
  return <PageNav currentPage={currentPage} totalPages={resolvedQuestions.page.totalPages} />;
}
