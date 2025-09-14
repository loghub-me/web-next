import { getUserQuestions } from '@/apis/server/user';
import { QuestionListItems, QuestionPageNav } from '@/app/search/questions/page';
import { PageSkeleton } from '@/components/client/page';
import { QuestionSearchForm } from '@/components/client/question';
import { QuestionList, QuestionListSkeleton } from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { questionSearchSchema } from '@/schemas/question';
import { userDetailSchema } from '@/schemas/user';
import { Suspense } from 'react';

export default async function UserQuestionSearchPage({ params, searchParams }: PageProps<'/search/questions'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, questionSearchSchema);
  const questions = getUserQuestions(parsedParam.username, parsedSearchParams);

  return (
    <div className="space-y-4">
      <QuestionSearchForm defaultValues={parsedSearchParams} action={`/${parsedParam.username}/questions`} />
      <QuestionList>
        <Suspense fallback={<QuestionListSkeleton />}>
          <QuestionListItems questions={questions} />
        </Suspense>
      </QuestionList>
      <Suspense fallback={<PageSkeleton />}>
        <QuestionPageNav currentPage={parsedSearchParams.page} questions={questions} />
      </Suspense>
    </div>
  );
}
