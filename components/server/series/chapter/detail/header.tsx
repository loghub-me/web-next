import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface SeriesChapterDetailHeaderProps {
  title: string;
}

export default function SeriesChapterDetailHeader(props: Readonly<SeriesChapterDetailHeaderProps>) {
  const { title } = props;

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <h4 className="text-lg font-semibold">{title}</h4>
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
