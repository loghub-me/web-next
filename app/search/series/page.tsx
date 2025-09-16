import { getSeries } from '@/apis/server/series';
import { PageNav, PageSkeleton } from '@/components/client/page';
import { SeriesSearchForm } from '@/components/client/series';
import { SeriesList, SeriesListItem, SeriesListSkeleton } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesSearchSchema } from '@/schemas/series';
import ListEmpty from '@ui/list-empty';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '시리즈 검색',
  description: '시리즈는 여러 아티클을 모아 하나의 주제로 구성된 글 모음입니다.',
};

export default async function SeriesSearchPage({ searchParams }: PageProps<'/search/series'>) {
  const parsedSearchParams = parseObject(await searchParams, seriesSearchSchema);
  const series = getSeries(parsedSearchParams);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <SeriesSearchForm defaultValues={parsedSearchParams} />
      <SeriesList>
        <Suspense fallback={<SeriesListSkeleton />}>
          <SeriesListItems series={series} />
        </Suspense>
      </SeriesList>
      <Suspense fallback={<PageSkeleton />}>
        <SeriesPageNav currentPage={parsedSearchParams.page} series={series} />
      </Suspense>
    </main>
  );
}

interface SeriesListItemsProps {
  series: Promise<Page<Series>>;
}

export async function SeriesListItems({ series }: Readonly<SeriesListItemsProps>) {
  const resolvedSeries = await series;

  if (resolvedSeries.content.length === 0) {
    return <ListEmpty message={'검색된 시리즈가 없습니다.'} className="py-4" />;
  }

  return resolvedSeries.content.map((item) => <SeriesListItem key={item.id} series={item} />);
}

interface SeriesPageNavProps extends SeriesListItemsProps {
  currentPage: number;
}

export async function SeriesPageNav({ currentPage, series }: Readonly<SeriesPageNavProps>) {
  const resolvedSeries = await series;
  return <PageNav currentPage={currentPage} totalPages={resolvedSeries.page.totalPages} />;
}
