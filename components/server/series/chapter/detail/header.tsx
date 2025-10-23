import { SeriesChapterEditLink, SeriesChapterTOCMenu } from '@/components/client/series';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface SeriesChapterDetailHeaderProps {
  title: string;
  sequence: number;
  anchors: Anchor[];
  series: {
    id: number;
    writer: UserDetail;
  };
}

export default function SeriesChapterDetailHeader(props: Readonly<SeriesChapterDetailHeaderProps>) {
  const { title, sequence, anchors, series } = props;

  return (
    <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <h4 className="flex-1 text-lg font-semibold line-clamp-2">{title}</h4>
      <SeriesChapterEditLink href={`/edit/series/${series.id}/${sequence}`} writer={series.writer} />
      <SeriesChapterTOCMenu anchors={anchors} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
