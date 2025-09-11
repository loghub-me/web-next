import { getSeriesChapterDetail, getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterCard } from '@/components/client/series';
import {
  SeriesChapterDetailContent,
  SeriesChapterDetailHeader,
  SeriesChapterDetailSkeleton,
  SeriesDetailAside,
  SeriesDetailContent,
  SeriesDetailHeader,
} from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesChapterDetailSchema } from '@/schemas/series';
import { Card } from '@ui/card';
import { Suspense } from 'react';

export default async function SeriesChapterDetailPage({ params }: PageProps<'/[username]/series/[slug]/[sequence]'>) {
  const { username, slug } = parseObject(await params, seriesChapterDetailSchema);
  const series = await getSeriesDetail(username, slug);
  const chapter = getSeriesChapterDetail(series.id, 1);

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
          <Suspense fallback={<SeriesChapterDetailSkeleton />}>
            <SeriesChapterDetail chapter={chapter} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

interface SeriesChapterDetailProps {
  chapter: Promise<SeriesChapterDetail>;
}

async function SeriesChapterDetail({ chapter }: Readonly<SeriesChapterDetailProps>) {
  const resolvedChapter = await chapter;

  return (
    <Card className="pt-0">
      <SeriesChapterDetailHeader {...resolvedChapter} />
      <SeriesChapterDetailContent {...resolvedChapter} />
    </Card>
  );
  // return <Card>{resolvedChapter.content.markdown}</Card>;
}
