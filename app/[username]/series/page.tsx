import { getUserSeries } from '@/apis/server/user';
import { SeriesListItems, SeriesPageNav } from '@/app/search/series/page';
import { PageSkeleton } from '@/components/client/page';
import { SeriesSearchForm } from '@/components/client/series';
import { SeriesList, SeriesListSkeleton } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesSearchSchema } from '@/schemas/series';
import { userDetailSchema } from '@/schemas/user';
import { Suspense } from 'react';

export default async function UserSeriesSearchPage({ params, searchParams }: PageProps<'/search/series'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, seriesSearchSchema);
  const series = getUserSeries(parsedParam.username, parsedSearchParams);

  return (
    <div className="space-y-4">
      <SeriesSearchForm defaultValues={parsedSearchParams} action={`/${parsedParam.username}/series`} />
      <SeriesList hasAside={true}>
        <Suspense fallback={<SeriesListSkeleton />}>
          <SeriesListItems series={series} />
        </Suspense>
      </SeriesList>
      <Suspense fallback={<PageSkeleton />}>
        <SeriesPageNav currentPage={parsedSearchParams.page} series={series} />
      </Suspense>
    </div>
  );
}
