import { getSeriesDetail } from '@/apis/server/series';
import SeriesReviews from '@/components/client/series/review';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';

export default async function SeriesDetailPage({ params }: PageProps<'/series/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);

  return <SeriesReviews id={series.id} />;
}
