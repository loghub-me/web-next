import { getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterCard } from '@/components/client/series';
import SeriesReviews from '@/components/client/series/review';
import { SeriesDetailAside, SeriesDetailContent, SeriesDetailHeader } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';
import { Card } from '@ui/card';

export default async function SeriesDetailPage({ params }: PageProps<'/[username]/series/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);

  return (
    <main className="container mx-auto pt-20 pb-4 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SeriesDetailAside>
          <Card className="pt-0">
            <SeriesDetailHeader {...series} />
            <SeriesDetailContent {...series} />
          </Card>
          <SeriesChapterCard chapters={series.chapters} prefixPath={`/${username}/series/${slug}`} />
        </SeriesDetailAside>
        <div className="w-full min-w-0 space-y-4">
          <SeriesReviews id={series.id} />
        </div>
      </div>
    </main>
  );
}
