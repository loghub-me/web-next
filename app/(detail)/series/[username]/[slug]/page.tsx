import { getSeriesDetail } from '@/apis/server/series';
import SeriesReviews from '@/components/client/series/review';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';
import { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/series/[username]/[slug]'>): Promise<Metadata> {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);
  return {
    title: series.title,
    description: series.description.slice(0, 160).replace(/\n/g, ' '),
  };
}

export default async function SeriesDetailPage({ params }: PageProps<'/series/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);

  return <SeriesReviews id={series.id} />;
}
