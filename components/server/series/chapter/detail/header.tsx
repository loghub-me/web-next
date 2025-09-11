import { SeriesChapterTOCMenu } from '@/components/client/series';
import { ButtonLink } from '@ui/button';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';
import { PencilIcon } from 'lucide-react';

interface SeriesChapterDetailHeaderProps {
  seriesId: number;
  title: string;
  sequence: number;
  anchors: Anchor[];
}

export default function SeriesChapterDetailHeader(props: Readonly<SeriesChapterDetailHeaderProps>) {
  const { seriesId, title, sequence, anchors } = props;

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <h4 className="flex-1 text-lg font-semibold">{title}</h4>
      <ButtonLink href={`/edit/series/${seriesId}/${sequence}`} size={'icon'}>
        <PencilIcon />
      </ButtonLink>
      <SeriesChapterTOCMenu anchors={anchors} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
