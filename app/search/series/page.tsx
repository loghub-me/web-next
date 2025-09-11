import { getSeries } from '@/apis/server/series';
import { PageNav, PageSkeleton } from '@/components/client/page';
import { SeriesSearchForm } from '@/components/client/series';
import { SeriesList, SeriesListItem, SeriesListSkeleton } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesSearchSchema } from '@/schemas/series';
import { Suspense } from 'react';

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

async function SeriesListItems({ series }: Readonly<SeriesListItemsProps>) {
  const resolvedSeries = await series;
  return resolvedSeries.content.map((item) => <SeriesListItem key={item.id} series={item} />);
}

interface SeriesPageNavProps extends SeriesListItemsProps {
  currentPage: number;
}

async function SeriesPageNav({ currentPage, series }: Readonly<SeriesPageNavProps>) {
  const resolvedSeries = await series;
  return <PageNav currentPage={currentPage} totalPages={resolvedSeries.page.totalPages} />;
}
