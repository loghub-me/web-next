import { getSeriesChapterDetail, getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterCard } from '@/components/client/series';
import {
  SeriesChapterDetailContent,
  SeriesChapterDetailFooter,
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

export const experimental_ppr = true;

export default async function SeriesChapterDetailPage({ params }: PageProps<'/series/[username]/[slug]/[sequence]'>) {
  const { username, slug, sequence } = parseObject(await params, seriesChapterDetailSchema);
  const series = await getSeriesDetail(username, slug);
  const chapter = getSeriesChapterDetail(series.id, sequence);
  const prefixPath = `/series/${username}/${slug}`;

  return (
    <main className="container mx-auto pt-20 pb-4 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SeriesDetailAside>
          <Card className="pt-0">
            <SeriesDetailHeader {...series} />
            <SeriesDetailContent {...series} />
          </Card>
          <SeriesChapterCard chapters={series.chapters} prefixPath={prefixPath} />
        </SeriesDetailAside>
        <div className="w-full min-w-0 space-y-4">
          <Suspense fallback={<SeriesChapterDetailSkeleton />}>
            <SeriesChapterDetail
              chapter={chapter}
              series={series}
              prefixPath={prefixPath}
              totalChapters={series.chapters.length}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

interface SeriesChapterDetailProps {
  chapter: Promise<SeriesChapterDetail>;
  series: {
    id: number;
    writer: User;
  };
  prefixPath: string;
  totalChapters: number;
}

async function SeriesChapterDetail({ chapter, series, prefixPath, totalChapters }: Readonly<SeriesChapterDetailProps>) {
  const resolvedChapter = await chapter;
  const { sequence } = resolvedChapter;

  return (
    <Card className="pt-0">
      <SeriesChapterDetailHeader series={series} {...resolvedChapter} />
      <SeriesChapterDetailContent {...resolvedChapter} />
      <SeriesChapterDetailFooter
        prefixPath={prefixPath}
        sequence={sequence}
        hasPrev={sequence > 1}
        hasNext={sequence < totalChapters}
      />
    </Card>
  );
}
