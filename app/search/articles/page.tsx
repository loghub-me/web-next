import { getArticles } from '@/apis/server/article';
import { ArticleSearchForm } from '@/components/client/article';
import { PageNav, PageSkeleton } from '@/components/client/page';
import { ArticleList, ArticleListItem, ArticleListSkeleton } from '@/components/server/article';
import { parseObject } from '@/lib/parse';
import { articleSearchSchema } from '@/schemas/article';
import ListEmpty from '@ui/list-empty';
import { Suspense } from 'react';

export default async function ArticleSearchPage({ searchParams }: PageProps<'/search/articles'>) {
  const parsedSearchParams = parseObject(await searchParams, articleSearchSchema);
  const articles = getArticles(parsedSearchParams);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <ArticleSearchForm defaultValues={parsedSearchParams} />
      <ArticleList>
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleListItems articles={articles} />
        </Suspense>
      </ArticleList>
      <Suspense fallback={<PageSkeleton />}>
        <ArticlePageNav currentPage={parsedSearchParams.page} articles={articles} />
      </Suspense>
    </main>
  );
}

interface ArticleListItemsProps {
  articles: Promise<Page<Article>>;
}

export async function ArticleListItems({ articles }: Readonly<ArticleListItemsProps>) {
  const resolvedArticles = await articles;

  if (resolvedArticles.content.length === 0) {
    return <ListEmpty message={'검색된 아티클이 없습니다.'} className="py-4" />;
  }

  return resolvedArticles.content.map((article) => <ArticleListItem key={article.id} article={article} />);
}

interface ArticlePageNavProps extends ArticleListItemsProps {
  currentPage: number;
}

export async function ArticlePageNav({ currentPage, articles }: Readonly<ArticlePageNavProps>) {
  const resolvedArticles = await articles;
  return <PageNav currentPage={currentPage} totalPages={resolvedArticles.page.totalPages} />;
}
