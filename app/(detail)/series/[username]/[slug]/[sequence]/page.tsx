import { getSeriesChapterDetail, getSeriesDetail } from '@/apis/server/series';
import {
  SeriesChapterDetailContent,
  SeriesChapterDetailFooter,
  SeriesChapterDetailHeader,
} from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesChapterDetailSchema } from '@/schemas/series';
import { Card } from '@ui/card';

export const experimental_ppr = true;

export default async function SeriesChapterDetailPage({ params }: PageProps<'/series/[username]/[slug]/[sequence]'>) {
  const { username, slug, sequence } = parseObject(await params, seriesChapterDetailSchema);
  const series = await getSeriesDetail(username, slug);
  const chapter = getSeriesChapterDetail(series.id, sequence);
  const prefixPath = `/series/${username}/${slug}`;

  return (
    <SeriesChapterDetail
      chapter={chapter}
      series={series}
      prefixPath={prefixPath}
      totalChapters={series.chapters.length}
    />
  );
}

interface SeriesChapterDetailProps {
  chapter: Promise<SeriesChapterDetail>;
  series: {
    id: number;
    writer: UserDetail;
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
