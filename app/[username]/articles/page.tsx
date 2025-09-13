import { getUserArticles } from '@/apis/server/user';
import { ArticleListItems, ArticlePageNav } from '@/app/search/articles/page';
import { ArticleSearchForm } from '@/components/client/article';
import { PageSkeleton } from '@/components/client/page';
import { ArticleList, ArticleListSkeleton } from '@/components/server/article';
import { parseObject } from '@/lib/parse';
import { articleSearchSchema } from '@/schemas/article';
import { userDetailSchema } from '@/schemas/user';
import { Suspense } from 'react';

export default async function UserArticleSearchPage({ params, searchParams }: PageProps<'/search/articles'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, articleSearchSchema);
  const articles = getUserArticles(parsedParam.username, parsedSearchParams);

  return (
    <div className="space-y-4">
      <ArticleSearchForm defaultValues={parsedSearchParams} action={`/${parsedParam.username}/articles`} />
      <ArticleList hasAside={true}>
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleListItems articles={articles} />
        </Suspense>
      </ArticleList>
      <Suspense fallback={<PageSkeleton />}>
        <ArticlePageNav currentPage={parsedSearchParams.page} articles={articles} />
      </Suspense>
    </div>
  );
}
